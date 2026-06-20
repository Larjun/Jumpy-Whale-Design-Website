import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { LazyMotion, domAnimation, m, MotionConfig } from 'framer-motion'
import { LiveryCarousel } from '@/components/LiveryCarousel'
import { FilterSection } from '@/components/FilterSection'

export function Home() {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-background text-foreground">
          {/* Jumbotron */}
          <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <m.img
              src="/logo/jwd_turq.svg"
              alt="Jumpy Whale Design"
              className="mb-12 h-auto w-[85vw] max-w-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <m.h1
              className="mx-auto max-w-2xl text-4xl tracking-tight text-foreground sm:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2 }}
            >
              Simracing Liveries
            </m.h1>
            <m.p
              className="mt-6 max-w-md text-base text-muted-foreground"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Custom simracing liveries for iRacing, ACC, Le Mans Ultimate and more.
            </m.p>
            <m.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/liveries"
                className="rounded-xl border border-border px-8 py-3 text-base font-medium transition-colors hover:bg-card"
              >
                View all work
              </Link>
            </m.div>
          </section>

          <LiveryCarousel />
          <FilterSection />
          <div className="mx-10 my-10">
            <h2 className="mb-5">AI Policy</h2>
            <p>
              Generative AI will not be used to on the final product that is any livery distributed
              or driven on track, unless the said AI happens to be an image of Italian Brainrot or
              utterly cursed beyond human imagination like such Italian Brainrot, which case will be
              used as Itasha. Everything else including regular decals, sponsors, design, anime
              characters, memes, people and pets will be created by me or acquired through non
              generative AI sources. I am firm believe of human ability and creating liveries is a
              way to excersice my idea and passion for art and creation.
            </p>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
