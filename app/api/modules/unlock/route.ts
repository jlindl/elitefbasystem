import { NextResponse } from "next/server";

const PASSWORD = "123";
const COOKIE = "modules_unlocked";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (password !== PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK,
  });
  return res;
}
