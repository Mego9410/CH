export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = typeof searchParams?.next === "string" ? searchParams.next : "/";

  return (
    <div className="page-canvas min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_64px_rgba(16,17,19,0.10)]">
        <div className="px-7 pt-7 pb-6">
          <div className="font-serif text-2xl tracking-tight">Enter password</div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            This site is private. Enter the password to continue.
          </p>
        </div>

        <form
          className="px-7 pb-7 space-y-4"
          action="/api/login"
          method="post"
        >
          <input type="hidden" name="next" value={next} />

          <label className="block">
            <span className="sr-only">Password</span>
            <input
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-[var(--foreground)] shadow-sm outline-none focus-visible:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Password"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white shadow-[0_14px_28px_rgba(30,58,95,0.25)] hover:bg-[var(--accent-2)] transition-colors"
          >
            Continue
          </button>

          <p className="text-xs text-[var(--muted)]">
            If you don’t have the password, close this tab.
          </p>
        </form>
      </div>
    </div>
  );
}

