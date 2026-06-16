const BRAND_PALETTES = [
  {
    name: 'Blue',
    swatches: [
      { label: 'Brand', token: '--brand-blue', hex: '#007FFF', className: 'bg-brand-blue' },
      {
        label: 'Light',
        token: '--brand-blue-light',
        hex: '#71AFFF',
        className: 'bg-brand-blue-light',
      },
      {
        label: 'Dark',
        token: '--brand-blue-dark',
        hex: '#004C9E',
        className: 'bg-brand-blue-dark',
      },
      {
        label: 'Foreground',
        token: '--brand-blue-foreground',
        hex: '#FFFFFF',
        className: 'bg-brand-blue-foreground',
      },
    ],
  },
  {
    name: 'Pink',
    swatches: [
      { label: 'Brand', token: '--brand-pink', hex: '#FF2680', className: 'bg-brand-pink' },
      {
        label: 'Light',
        token: '--brand-pink-light',
        hex: '#FF86AB',
        className: 'bg-brand-pink-light',
      },
      {
        label: 'Dark',
        token: '--brand-pink-dark',
        hex: '#9E134D',
        className: 'bg-brand-pink-dark',
      },
      {
        label: 'Foreground',
        token: '--brand-pink-foreground',
        hex: '#FFFFFF',
        className: 'bg-brand-pink-foreground',
      },
    ],
  },
  {
    name: 'Turquoise',
    swatches: [
      {
        label: 'Brand',
        token: '--brand-turquoise',
        hex: '#00FFA1',
        className: 'bg-brand-turquoise',
      },
      {
        label: 'Light',
        token: '--brand-turquoise-light',
        hex: '#92FFC3',
        className: 'bg-brand-turquoise-light',
      },
      {
        label: 'Dark',
        token: '--brand-turquoise-dark',
        hex: '#009E62',
        className: 'bg-brand-turquoise-dark',
      },
      {
        label: 'Foreground',
        token: '--brand-turquoise-foreground',
        hex: '#08060D',
        className: 'bg-brand-turquoise-foreground',
      },
    ],
  },
  {
    name: 'White',
    swatches: [
      { label: 'Brand', token: '--brand-white', hex: '#FFFFFF', className: 'bg-brand-white' },
      {
        label: 'Light',
        token: '--brand-white-light',
        hex: '#FFFFFF',
        className: 'bg-brand-white-light',
      },
      {
        label: 'Dark',
        token: '--brand-white-dark',
        hex: '#CECECE',
        className: 'bg-brand-white-dark',
      },
      {
        label: 'Foreground',
        token: '--brand-white-foreground',
        hex: '#08060D',
        className: 'bg-brand-white-foreground',
      },
    ],
  },
] as const

const NEUTRAL_SURFACES = [
  { label: 'Background', token: '--background', hex: '#0A0A0A', className: 'bg-background' },
  { label: 'Card', token: '--card', hex: '#171717', className: 'bg-card' },
  { label: 'Muted', token: '--muted', hex: '#262626', className: 'bg-muted' },
  { label: 'Foreground', token: '--foreground', hex: '#FAFAFA', className: 'bg-foreground' },
  { label: 'Border', token: '--border', hex: '#FFFFFF / 10%', className: 'bg-border' },
] as const

const LOGOS = [
  { name: 'Blue', src: '/logo/jwd_blue.svg' },
  { name: 'Pink', src: '/logo/jwd_pink.svg' },
  { name: 'Turquoise', src: '/logo/jwd_turq.svg' },
  { name: 'White', src: '/logo/jwd_white.svg' },
] as const

export function ColorPalette() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-2xl font-semibold">Color palette</h1>
        <p className="text-sm text-muted-foreground">Brand themes and neutral surface tokens.</p>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-sm font-medium text-muted-foreground">Brand themes</h2>
        <div className="grid gap-8 sm:grid-cols-4">
          {BRAND_PALETTES.map(({ name, swatches }) => (
            <div key={name}>
              <h3 className="mb-3 font-medium">{name}</h3>
              <div className="flex flex-col gap-3">
                {swatches.map(({ label, token, hex, className }) => (
                  <div key={token} className="flex items-center gap-3">
                    <div
                      className={`size-10 shrink-0 rounded-md border border-border ${className}`}
                    />
                    <div className="text-xs">
                      <p className="font-medium">{label}</p>
                      <p className="text-muted-foreground">{token}</p>
                      <p className="text-muted-foreground">{hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-sm font-medium text-muted-foreground">Neutral surfaces</h2>
        <div className="flex flex-wrap gap-6">
          {NEUTRAL_SURFACES.map(({ label, token, hex, className }) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div className={`size-16 rounded-lg border border-border ${className}`} />
              <div className="text-center text-xs">
                <p className="font-medium">{label}</p>
                <p className="text-muted-foreground">{token}</p>
                <p className="text-muted-foreground">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-sm font-medium text-muted-foreground">Logos</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {LOGOS.map(({ name, src }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6"
            >
              <img src={src} alt={`Jumpy Whale Design logo, ${name}`} className="h-10 w-auto" />
              <span className="text-sm text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
