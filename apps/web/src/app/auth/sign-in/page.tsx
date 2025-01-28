import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import githubIcon from '@/app/assets/github.svg'
import Link from 'next/link'
import Image from 'next/image'
import { signInWithEmailAndPassword } from './actions'

export default function SignInPage() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password"></Input>
        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          {' '}
          Forgot your password ?
        </Link>
      </div>

      <Button className="w-full" type="submit">
        Sign in with e-mail{' '}
      </Button>
      <Button variant={'link'} className="w-full" size={'sm'} asChild>
        <Link href="/auth/sign-up"> Don`t have an account ? Sign Up</Link>
      </Button>

      <Separator />
      <Button className="w-full" variant={'outline'} type="submit">
        <Image
          src={githubIcon}
          className="mr-2 size-4 dark:invert"
          alt="Github Icon"
        />
        Sign in with Github{' '}
      </Button>
    </form>
  )
}
