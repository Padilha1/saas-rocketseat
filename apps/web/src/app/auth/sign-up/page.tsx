import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import githubIcon from '@/app/assets/github.svg'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password-confirmation">Confirm Password</Label>
        <Input
          name="password-confirmation"
          type="password"
          id="password-confirmation"
        ></Input>
      </div>

      <Button className="w-full" type="submit">
        Create Account
      </Button>
      <Button variant={'link'} className="w-full" size={'sm'} asChild>
        <Link href="/auth/sign-in"> Already registered ? Sign In</Link>
      </Button>

      <Separator />
      <Button className="w-full" variant={'outline'} type="submit">
        <Image
          src={githubIcon}
          className="mr-2 size-4 dark:invert"
          alt="Github Icon"
        />
        Sign up with Github{' '}
      </Button>
    </form>
  )
}
