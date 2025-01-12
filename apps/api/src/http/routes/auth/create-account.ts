import { prisma } from '@/lib/prisma'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create New Account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })
      if (userWithSameEmail) {
        throw new BadRequestError('User with same e-mail already exists.')
      }
      const [, domain] = email.split('@')
      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain,
          shouldAttachUsersByDomain: true,
        },
      })

      const passwordHash = await hash(password, 6)

      await prisma.user.create({
        data: {
          name,
          email,
          passwordhash: passwordHash,
          member_on: autoJoinOrganization
            ? {
                create: { organizationId: autoJoinOrganization.id },
              }
            : undefined,
        },
      })

      return reply.status(201).send()
    }
  )
}
