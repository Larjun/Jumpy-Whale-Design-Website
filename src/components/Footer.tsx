const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
      © {YEAR} Jumpy Whale Design is powered by&nbsp;
      <a
        href="https://jumpywhale.com"
        className="text-brand-turquoise hover:text-brand-turquoise-dark hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Jumpy Whale
      </a>
    </footer>
  )
}
