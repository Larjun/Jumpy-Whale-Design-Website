import { useEffect, useRef, useState, type ReactNode } from 'react'

interface CarouselProps {
  children: ReactNode[]
  autoplay?: boolean
  autoplayInterval?: number
  'aria-label'?: string
}

export function Carousel({
  children,
  autoplay = false,
  autoplayInterval = 8000,
  'aria-label': ariaLabel = 'Carousel',
}: CarouselProps) {
  const count = children.length
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (index: number) => {
    setCurrent(((index % count) + count) % count)
  }

  const startTimer = () => {
    if (!autoplay) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent((i) => (i + 1) % count), autoplayInterval)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    if (autoplay) startTimer()
    return stopTimer
  }, [autoplay, autoplayInterval])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(current + 1)
      if (e.key === 'ArrowLeft') go(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current])

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
    <section
      aria-label={ariaLabel}
      className="group relative overflow-hidden rounded-xl"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Slides */}
      <div
        role="group"
        aria-label="Slides"
        className="flex transform-gpu transition-transform duration-500 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        {children.map((child, i) => (
          <div key={i} className="min-w-0 flex-[0_0_100%]">
            {child}
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => { go(current - 1); startTimer() }}
        className="absolute top-0 bottom-0 left-0 flex w-16 items-center justify-center bg-linear-to-r from-black/50 to-transparent text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => { go(current + 1); startTimer() }}
        className="absolute top-0 right-0 bottom-0 flex w-16 items-center justify-center bg-linear-to-l from-black/50 to-transparent text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { go(i); startTimer() }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
