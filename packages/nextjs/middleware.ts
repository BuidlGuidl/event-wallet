import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const config = {
  matcher: "/api/:function*",
};

export async function middleware() {
  try {
    await kv.ping();
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "KV storage is not set" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
}
