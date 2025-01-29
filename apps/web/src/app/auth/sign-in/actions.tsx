'use server'
import { z } from 'zod'
import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please provide valid email.' }),
  password: z.string().min(1, { message: 'Please provide valid email.' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email: String(email),
      password: String(password),
    })

    console.log(token)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message, errors: null }
    }
    console.error(error)
    return {
      success: false,
      message: 'Unexpected error, try again later.',
      errors: null,
    }
  }
  return { success: true, message: null, errors: null }
}
