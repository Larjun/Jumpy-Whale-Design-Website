import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LIVERIES } from '@/lib/liverylist'
import { ikSrcSet, ikUrl } from '@/lib/imagekit'
import { Carousel } from '@/components/Carousel'

function Pill({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        accent ? 'bg-brand-turquoise/15 text-brand-turquoise' : 'bg-muted text-muted-foreground'
      }`}
    >
      {label}
    </span>
  )
}

export function LiveryDetail() {
  const { id } = useParams<{ id: string }>()
  const [activeSlide, setActiveSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const livery = LIVERIES.find((l) => l.id === Number(id))

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  if (!livery) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold">Livery not found</p>
          <Link
            to="/liveries"
            className="mt-4 inline-block text-sm text-muted-foreground underline"
          >
            Back to liveries
          </Link>
        </div>
      </div>
    )
  }

  const allIndices = Array.from({ length: livery.photoCount }, (_, i) => i + 1)
  const orderedIndices = [
    livery.thumbnailImg,
    ...allIndices.filter((i) => i !== livery.thumbnailImg),
  ]
  const photos = orderedIndices.map((i) => `liveries/${livery.photoName}_${i}.jpg`)
  const activePath = photos[activeSlide]

  return (
    <main className="mx-auto w-[90%] max-w-6xl pt-8 pb-32">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-5xl tracking-tight">{livery.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill label={livery.team} />
            <Pill label={livery.game} />
            {livery.isItasha && <Pill label="Itasha" accent />}
          </div>
        </div>

        {livery.link && (
          <a
            href={livery.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 self-start rounded-xl border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-card"
          >
            View / Download
          </a>
        )}
      </div>

      {/* Photo carousel */}
      <div className="group/carousel relative">
        <Carousel
          aria-label={`${livery.name} photos`}
          slide={activeSlide}
          onSlideChange={setActiveSlide}
        >
          {photos.map((path, i) => (
            <img
              key={path}
              src={ikUrl(path, { width: 1600, quality: 75 })}
              srcSet={ikSrcSet(path, 75, true)}
              sizes="(min-width: 1280px) 1152px, 90vw"
              alt={`${livery.name} — ${i + 1}`}
              width={1920}
              height={1080}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="block h-auto w-full"
              draggable={false}
            />
          ))}
        </Carousel>
        <button
          type="button"
          aria-label="Expand image"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-black/70"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>

      {/* All photos grid */}
      {photos.length > 1 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((path, i) => (
            <button
              key={path}
              type="button"
              onClick={() => setActiveSlide(i)}
              className="overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={ikUrl(path, { width: 640, quality: 70 })}
                srcSet={ikSrcSet(path)}
                sizes="(min-width: 1280px) 370px, (min-width: 640px) 30vw, 44vw"
                alt={`${livery.name} — ${i + 1}`}
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={ikUrl(activePath, { width: 1920, quality: 90 })}
            srcSet={ikSrcSet(activePath, 90, true)}
            sizes="100vw"
            alt={`${livery.name} — ${activeSlide + 1}`}
            width={1920}
            height={1080}
            decoding="async"
            className="max-h-screen max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      )}
    </main>
  )
}
