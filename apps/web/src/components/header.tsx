import { Slash } from 'lucide-react'
import { ProfileButton } from './profile-button'
import RecyclingIcon from '@/app/assets/recycling.svg'
import Image from 'next/image'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/auth/auth'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'

export async function Header() {
  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Image src={RecyclingIcon} className="size-6 dark:invert" alt="Logo" />
        <Slash className="size-3 -rotate-[24deg] text-border"></Slash>
        <OrganizationSwitcher />
        {permissions?.can('get', 'Project') && <p>Project</p>}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
