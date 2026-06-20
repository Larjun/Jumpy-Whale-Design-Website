import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ColorPalette } from '@/pages/ColorPalette'
import { Home } from '@/pages/Home'
import { Liveries } from '@/pages/Liveries'
import { LiveryDetail } from '@/pages/LiveryDetail'
import { ThemeShowcase } from '@/pages/ThemeShowcase'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const THEMES = ['blue', 'pink', 'turquoise', 'white'] as const

function ThemeRoute({ theme }: { theme: (typeof THEMES)[number] }) {
  return (
    <div data-theme={theme}>
      <ThemeShowcase themeName={theme} />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollToTop />
      {pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liveries" element={<Liveries />} />
        <Route path="/liveries/:filterType/:filterValue" element={<Liveries />} />
        <Route path="/livery/:id" element={<LiveryDetail />} />
        {THEMES.map((theme) => (
          <Route key={theme} path={`/${theme}`} element={<ThemeRoute theme={theme} />} />
        ))}
        <Route path="/palette" element={<ColorPalette />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
