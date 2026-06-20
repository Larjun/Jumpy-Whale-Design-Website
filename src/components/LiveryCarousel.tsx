import { LIVERIES } from '@/lib/liverylist'
import { ikSrcSet, ikUrl } from '@/lib/imagekit'
import { Carousel } from '@/components/Carousel'

const FEATURED = LIVERIES.filter((l) => l.isFeatured)

export function LiveryCarousel() {
  return (
    <section className="mx-auto w-full pt-4 pb-32">
      <p className="mb-4 text-3xl font-semibold tracking-[0.10em] text-brand-turquoise uppercase">
        Featured works
      </p>

      <Carousel autoplay autoplayInterval={8000} aria-label="Featured works carousel">
        {FEATURED.map((livery, i) => {
          const path = `liveries/${livery.photoName}_${livery.thumbnailImg}.jpg`
          const priority = i === 0 || i === 1 || i === FEATURED.length - 1
          return (
            <div key={livery.id}>
              <img
                src={ikUrl(path, { width: 1600, quality: 70 })}
                srcSet={ikSrcSet(path, 70, true)}
                sizes="100vw"
                alt={livery.name}
                width={1920}
                height={1080}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
                className="block h-auto w-full"
                draggable={false}
              />
              <div className="bg-card px-4 pt-7 pb-8">
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
      </Carousel>
    </section>
  )
}
