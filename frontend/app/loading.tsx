export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="
        min-h-screen
        bg-zinc-100
        pb-24
      "
    >
      <span className="sr-only">Loading page</span>

      <header
        className="
          sticky
          top-0
          z-50
          bg-white
          border-b
          border-zinc-200
          shadow-sm
        "
      >
        <div className="max-w-md mx-auto px-4 h-16 flex items-center">
          <div
            aria-hidden="true"
            className="
              h-8
              w-40
              bg-zinc-200
              rounded-xl
              animate-pulse
            "
          />
        </div>
      </header>

      <div
        className="
          max-w-md
          mx-auto
          p-4
          pt-6
        "
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-sm
              mb-4
            "
          >
            <div
              className="
                h-52
                bg-zinc-200
                animate-pulse
              "
            />

            <div className="p-4">
              <div
                className="
                  h-7
                  bg-zinc-200
                  rounded-lg
                  animate-pulse
                  mb-3
                "
              />

              <div
                className="
                  h-5
                  w-28
                  bg-zinc-200
                  rounded-lg
                  animate-pulse
                  mb-5
                "
              />

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    h-7
                    w-24
                    bg-zinc-200
                    rounded-lg
                    animate-pulse
                  "
                />

                <div
                  className="
                    h-5
                    w-20
                    bg-zinc-200
                    rounded-lg
                    animate-pulse
                  "
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="
          fixed
          bottom-24
          right-5
          z-40
          w-16
          h-16
          rounded-full
          bg-zinc-300
          shadow-xl
          animate-pulse
        "
      />
    </main>
  )
}
