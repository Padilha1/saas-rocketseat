import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with Email and Password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        throw new BadRequestError('Invalid credentials.')
      }
      if (userFromEmail.passwordhash === null) {
        throw new BadRequestError(
          'User does not have a password, use social login.'
        )
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordhash
      )

      if (!isPasswordValid) {
        throw new BadRequestError('Invalid credentials.')
      }
      const token = await reply.jwtSign(
        { sub: userFromEmail.id },
        {
          sign: {
            expiresIn: '7d',
          },
        }
      )

      return reply.status(201).send({ token })
    }
  )
}
