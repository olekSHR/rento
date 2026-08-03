export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative w-full min-h-[clamp(18rem,50svh,28rem)] overflow-hidden bg-[#252525]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A] via-[#252525] to-[#1F1F1F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_12%,rgba(223,197,138,0.09),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_50%,transparent_45%,rgba(15,15,15,0.28))]" />

        <div className="absolute inset-0 bg-[url('/media/home/hero-galati-poster.webp')] bg-cover bg-center" />

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/home/hero-galati-poster.webp"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/media/home/hero-galati.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B]/92 to-transparent" />
      </div>

      <div className="relative grid min-h-[clamp(18rem,50svh,28rem)] grid-rows-[minmax(0,1fr)_auto] px-5 pb-8 md:pb-10">
        <div aria-hidden="true" className="min-h-[3rem] sm:min-h-[4rem]" />

        <div className="mx-auto w-full max-w-[20rem] text-center sm:max-w-[22rem]">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
            Galați
          </p>

          <h2
            id="home-hero-heading"
            className="mt-2.5 text-[1.75rem] font-semibold leading-tight tracking-tight text-[#F5F5F5] sm:text-[2rem]"
          >
            Find your next home in Galați
          </h2>

          <p className="mt-2.5 text-sm leading-snug text-[#B8B8B8]">
            Explore verified rentals for comfortable long-term living.
          </p>

          <a
            href="#home-properties"
            className="
              mt-5
              inline-flex
              h-11
              min-w-[9.5rem]
              items-center
              justify-center
              rounded-full
              bg-[#DFC58A]
              px-6
              text-sm
              font-semibold
              text-[#1B1B1B]
              transition
              hover:bg-[#e8d099]
              active:scale-[0.98]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#DFC58A]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#1B1B1B]
            "
          >
            View listings
          </a>
        </div>
      </div>
    </section>
  )
}
