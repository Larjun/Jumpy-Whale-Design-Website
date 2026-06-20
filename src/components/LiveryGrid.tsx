import { Link } from 'react-router-dom'
import type { LiveryClassDef } from '@/lib/liverylist'
import { ikSrcSet, ikUrl } from '@/lib/imagekit'

function LiveryCard({
  id,
  name,
  team,
  game,
  photoName,
  thumbnailImg,
}: {
  id: number
  name: string
  team: string
  game: string
  photoName: string
  thumbnailImg: number
}) {
  const path = `liveries/${photoName}_${thumbnailImg}.jpg`

  return (
    <Link to={`/livery/${id}`} className="group overflow-hidden rounded-xl bg-card">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={ikUrl(path, { width: 400, quality: 70 })}
          srcSet={ikSrcSet(path)}
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 28vw, 44vw"
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-3">
        <p className="text-sm leading-tight font-semibold">{name}</p>
        <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
          <span>{team}</span>
          <span>·</span>
          <span>{game}</span>
        </div>
      </div>
    </Link>
  )
}

export function LiveryGrid({ liveries, title }: { liveries: LiveryClassDef[]; title?: string }) {
  return (
    <section className="mx-auto w-[90%] pt-4 pb-32">
      {title && (
        <p className="mb-10 text-3xl font-semibold tracking-widest text-brand-turquoise uppercase">
          {title}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {liveries.map((livery) => (
          <LiveryCard key={livery.id} {...livery} />
        ))}
      </div>
    </section>
  )
}
