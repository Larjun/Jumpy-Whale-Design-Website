import { useParams, Link } from 'react-router-dom'
import { LIVERIES } from '@/lib/liverylist'
import { ikSrcSet, ikUrl } from '@/lib/imagekit'
import { Carousel } from '@/components/Carousel'

function Pill({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        accent
          ? 'bg-brand-turquoise/15 text-brand-turquoise'
          : 'bg-muted text-muted-foreground'
      }`}
    >
      {label}
    </span>
  )
}

export function LiveryDetail() {
  const { id } = useParams<{ id: string }>()
  const livery = LIVERIES.find((l) => l.id === Number(id))

  if (!livery) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold">Livery not found</p>
          <Link to="/liveries" className="mt-4 inline-block text-sm text-muted-foreground underline">
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
      <Carousel aria-label={`${livery.name} photos`}>
        {photos.map((path, i) => (
          <img
            key={path}
            src={ikUrl(path, { width: 1600, quality: 75 })}
            srcSet={ikSrcSet(path, 75, true)}
            sizes="(min-width: 1280px) 1152px, 90vw"
            alt={`${livery.name} — photo ${i + 1}`}
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

      {/* All photos grid */}
      {photos.length > 1 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((path, i) => (
            <div key={path} className="overflow-hidden rounded-lg bg-muted">
              <img
                src={ikUrl(path, { width: 640, quality: 70 })}
                srcSet={ikSrcSet(path)}
                sizes="(min-width: 1280px) 370px, (min-width: 640px) 30vw, 44vw"
                alt={`${livery.name} — photo ${i + 1}`}
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
