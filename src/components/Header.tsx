import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-1 text-sm capitalize transition-colors ${
    isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
  }`

export function Header() {
  return (
    <nav className="justify-left sticky top-0 z-10 flex gap-4 border-b border-border bg-background py-4">
      <NavLink to="/" end className={navLinkClass}>
        Home
      </NavLink>
    </nav>
  )
}
