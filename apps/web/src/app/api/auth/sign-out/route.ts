import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  const cookieStore = await cookies()

  redirectUrl.pathname = '/auth/sign-in'

  cookieStore.delete('token')

  return NextResponse.redirect(redirectUrl)
}
