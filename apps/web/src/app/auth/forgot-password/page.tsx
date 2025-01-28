import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Link from 'next/link'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email"></Input>
      </div>

      <Button className="w-full" type="submit">
        Recover Password
      </Button>
      <Button variant={'link'} className="w-full" size={'sm'} asChild>
        <Link href="/auth/sign-in"> Sign in instead</Link>
      </Button>
    </form>
  )
}
