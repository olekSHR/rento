"use client"

type Props = {
  error: Error
  reset: () => void
}

export default function ErrorPage({
  error,
  reset,
}: Props) {

  console.error(error)

  return (
    <main
      className="
        min-h-screen
        bg-zinc-100
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          text-center
        "
      >
        <div className="text-6xl mb-5">
          ⚠️
        </div>

        <h1
          className="
            text-3xl
            font-bold
            text-black
            mb-3
          "
        >
          Something went wrong
        </h1>

        <p
          className="
            text-zinc-500
            leading-7
            mb-8
          "
        >
          Failed to load data.
          Please try again.
        </p>

        <button
          onClick={reset}
          className="
            w-full
            h-14
            rounded-2xl
            bg-black
            text-white
            font-medium
            active:scale-[0.98]
            transition-transform
          "
        >
          Retry
        </button>
      </div>
    </main>
  )
}