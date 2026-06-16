import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { ColorPalette } from '@/pages/ColorPalette'
import { ThemeShowcase } from '@/pages/ThemeShowcase'

const THEMES = ['blue', 'pink', 'turquoise', 'white'] as const

function ThemeRoute({ theme }: { theme: (typeof THEMES)[number] }) {
  return (
    <div data-theme={theme}>
      <ThemeShowcase themeName={theme} />
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="sticky top-0 z-10 flex justify-center gap-4 border-b border-border bg-background py-4">
        {THEMES.map((theme) => (
          <NavLink
            key={theme}
            to={`/${theme}`}
            className={({ isActive }) =>
              `rounded-full px-3 py-1 text-sm capitalize transition-colors ${
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {theme}
          </NavLink>
        ))}
        <NavLink
          to="/palette"
          className={({ isActive }) =>
            `rounded-full px-3 py-1 text-sm transition-colors ${
              isActive
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          Palette
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/blue" replace />} />
        {THEMES.map((theme) => (
          <Route key={theme} path={`/${theme}`} element={<ThemeRoute theme={theme} />} />
        ))}
        <Route path="/palette" element={<ColorPalette />} />
      </Routes>
    </>
  )
}

export default App
