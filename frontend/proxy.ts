import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const REALTOR_PROFILE_PATH = /^\/realtors\/([^/]+)\/?$/

function getRealtorProfileApiBaseUrl(): string {
  return (
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000"
  ).replace(/\/$/, "")
}

function hardNotFoundResponse(request: NextRequest) {
  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
  })
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const match = pathname.match(REALTOR_PROFILE_PATH)

  if (!match) {
    return NextResponse.next()
  }

  const userIdSegment = match[1]

  if (!/^\d+$/.test(userIdSegment)) {
    return hardNotFoundResponse(request)
  }

  const userId = Number(userIdSegment)
  const apiUrl = `${getRealtorProfileApiBaseUrl()}/realtors/${userId}`

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    })

    if (response.status === 404) {
      return hardNotFoundResponse(request)
    }

    if (!response.ok) {
      return NextResponse.next()
    }
  } catch {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/realtors/:userId*"],
}
