export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 text-sm text-muted sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-fg">We are made of starstuff.</p>
          <p className="mt-2 max-w-md text-sm">
            — Carl Sagan. Imagery from NASA, ESA, Hubble, JWST, and ESO. Public-domain contributions
            to humanity.
          </p>
        </div>
        <div className="space-y-1 font-mono text-xs uppercase tracking-wider">
          <p>Cosmos / Atlas</p>
          <p className="text-dim">An exploration of the observable universe.</p>
          <p className="text-dim">{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
