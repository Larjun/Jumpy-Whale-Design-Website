import { NavLink } from 'react-router-dom'

const THEMES = ['blue', 'pink', 'turquoise', 'white'] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-1 text-sm capitalize transition-colors ${
    isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
  }`

export function Header() {
  return (
    <nav className="sticky top-0 z-10 flex justify-left gap-4 border-b border-border bg-background py-4">
      <NavLink to="/" end className={navLinkClass}>
        Home
      </NavLink>
    </nav>
  )
}
