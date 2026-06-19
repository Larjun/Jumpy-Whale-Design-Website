import { useEffect, useRef, useState } from 'react'
import { LIVERIES } from '@/lib/liverylist'
import { ikUrl } from '@/lib/imagekit'

const FEATURED = LIVERIES.filter((l) => l.isFeatured)
const AUTOSCROLL_INTERVAL = 8000

export function LiveryCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (index: number) => {
    setCurrent(((index % FEATURED.length) + FEATURED.length) % FEATURED.length)
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % FEATURED.length)
    }, AUTOSCROLL_INTERVAL)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % FEATURED.length)
    }, AUTOSCROLL_INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(current + 1)
      if (e.key === 'ArrowLeft') go(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current])

  // drag / swipe support
  const dragStartX = useRef<number | null>(null)

  const onDragStart = (x: number) => {
    stopTimer()
    dragStartX.current = x
  }

  const onDragEnd = (x: number) => {
    if (dragStartX.current === null) return
    const delta = dragStartX.current - x
    if (Math.abs(delta) > 40) go(current + (delta > 0 ? 1 : -1))
    dragStartX.current = null
    startTimer()
  }

  return (
    <section className="mx-auto w-full pt-4 pb-32">
      <p className="mb-4 text-3xl font-semibold tracking-[0.10em] text-brand-turquoise uppercase">
        Featured works
      </p>

      <section
        aria-label="Featured works carousel"
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <div
          role="group"
          aria-label="Slides"
          className="flex transition-transform duration-500 ease-in-out"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {FEATURED.map((livery) => (
            <div key={livery.id} className="min-w-0 flex-[0_0_100%]">
              <img
                src={ikUrl(`liveries/${livery.photoName}_${livery.thumbnailImg}.jpg`)}
                alt={livery.name}
                width={1920}
                height={1080}
                className="block h-auto w-full"
                draggable={false}
              />
              <div className="bg-card px-4 pt-7 pb-3">
                <p className="text-2xl font-semibold">{livery.name}</p>
                <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                  <span>{livery.team}</span>
                  <span>.</span>
                  <span>{livery.game}</span>
                  {livery.isItasha && (
                    <>
                      <span>.</span>
                      <span>Itasha</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dot indicators */}
        <div className="absolute bottom-18 left-1/2 flex -translate-x-1/2 gap-2">
          {FEATURED.map((livery, i) => (
            <button
              key={livery.id}
              type="button"
              aria-label={`Go to slide: ${livery.name}`}
              onClick={() => {
                go(i)
                startTimer()
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      </section>
    </section>
  )
}
