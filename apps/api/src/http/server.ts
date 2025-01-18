import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { errorHandler } from '@/http/error-handler'

import { createAccount } from '@auth/create-account'
import { authenticateWithPassword } from '@auth/authenticate-with-password'
import { getProfile } from '@/http/routes/auth/get-profile'
import { requestPasswordRecover } from '@auth/request-password-recover'
import { resetPassword } from '@auth/reset-password'
import { authenticateWithGithub } from '@auth/authenticate-with-github'
import { env } from '@saas/env'
import { createOrganization } from './routes/orgs/create-organization'
import { getMembership } from './routes/orgs/get-membership'
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
import { transferOrganization } from './routes/orgs/transfer-organization'
import { updateOrganization } from './routes/orgs/update-organization'
import { shutdownOrganization } from './routes/orgs/shutdown-organization'
import { createProject } from './routes/projects/create-project'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SaaS Rocketseat',
      description: 'Fullstack SaaS App with multi-tenat & RBAC ',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticateWithGithub)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(transferOrganization)
app.register(shutdownOrganization)

app.register(createProject)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running')
})
