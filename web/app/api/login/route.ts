import { NextResponse } from "next/server";

const AUTH_COOKIE = "ch_auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/");

  const expectedPass = process.env.SITE_PASSWORD ?? "Pa55!";

  if (password !== expectedPass) {
    return new NextResponse(
      `<!doctype html>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Incorrect password</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; padding:32px; background:#fbf8f2; color:#101113;}
  .card{max-width:420px; margin:0 auto; background:#fffdf8; border:1px solid rgba(16,17,19,.10); border-radius:16px; padding:20px;}
  a{color:#1e3a5f;}
</style>
<div class="card">
  <h1 style="margin:0 0 8px; font-size:18px;">Incorrect password</h1>
  <p style="margin:0 0 12px; color:rgba(16,17,19,.7);">Please try again.</p>
  <a href="/login">Back to login</a>
</div>`,
      {
        status: 401,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }

  const res = NextResponse.redirect(new URL(next.startsWith("/") ? next : "/", req.url), {
    status: 303,
  });

  res.cookies.set(AUTH_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });

  return res;
}

