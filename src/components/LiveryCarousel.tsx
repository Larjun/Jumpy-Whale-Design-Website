import { useEffect, useRef, useState } from 'react'
import { LIVERIES } from '@/lib/liverylist'
import { ikSrcSet, ikUrl } from '@/lib/imagekit'

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
        className="group relative overflow-hidden rounded-xl"
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <div
          role="group"
          aria-label="Slides"
          className="flex transform-gpu transition-transform duration-500 ease-in-out will-change-transform"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {FEATURED.map((livery, i) => {
            const path = `liveries/${livery.photoName}_${livery.thumbnailImg}.jpg`
            // Eagerly load the first slide and its immediate neighbours so a
            // transition never reveals an undecoded image; lazy-load the rest.
            const priority =
              i === 0 ||
              i === (current + 1) % FEATURED.length ||
              i === (current - 1 + FEATURED.length) % FEATURED.length
            return (
            <div key={livery.id} className="min-w-0 flex-[0_0_100%]">
              <img
                src={ikUrl(path, { width: 1600, quality: 70 })}
                srcSet={ikSrcSet(path, 70, true)}
                sizes="100vw"
                alt={livery.name}
                width={1920}
                height={1080}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={i === current ? 'high' : 'auto'}
                decoding="async"
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
            )
          })}
        </div>

        {/* prev / next arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => {
            go(current - 1)
            startTimer()
          }}
          className="absolute top-0 bottom-0 left-0 flex w-16 items-center justify-center bg-linear-to-r from-black/50 to-transparent text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => {
            go(current + 1)
            startTimer()
          }}
          className="absolute top-0 right-0 bottom-0 flex w-16 items-center justify-center bg-linear-to-l from-black/50 to-transparent text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

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
