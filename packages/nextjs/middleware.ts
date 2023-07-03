import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const config = {
  matcher: "/api/:function*",
};

export function middleware() {
  if (!Object.keys(kv).length) {
    return new NextResponse(JSON.stringify({ error: "KV storage is not set" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
}
