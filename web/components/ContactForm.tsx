"use client";

import { useMemo, useState } from "react";

type Method = "email" | "whatsapp";

function encodeLineBreaks(s: string) {
  return s.replace(/\n/g, "\r\n");
}

export function ContactForm({
  email,
  whatsappHref,
}: {
  email: string;
  whatsappHref: string;
}) {
  const [method, setMethod] = useState<Method>("email");
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const canSubmit = name.trim() && fromEmail.trim() && message.trim();

  const payload = useMemo(() => {
    const header = `Name: ${name.trim()}\nEmail: ${fromEmail.trim()}\n\n`;
    return (header + message.trim()).trim();
  }, [name, fromEmail, message]);

  function openEmail() {
    const subject = `Chronicle Health — message from ${name.trim() || "website"}`;
    const body = encodeLineBreaks(payload);
    window.location.href =
      `mailto:${encodeURIComponent(email)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  function openWhatsApp() {
    // Supports wa.me links; if the user provided a full URL, preserve it.
    const base = whatsappHref.trim();
    const sep = base.includes("?") ? "&" : "?";
    const url = `${base}${sep}text=${encodeURIComponent(payload)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    if (!canSubmit) {
      setStatus("error");
      return;
    }

    try {
      if (method === "email") openEmail();
      else openWhatsApp();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_22px_65px_rgba(15,18,25,0.12)] sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
            Contact form
          </div>
          <div className="mt-2 font-serif text-[22px] leading-7 tracking-tight">
            Send a message
          </div>
        </div>

        <div className="inline-flex rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-1">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={[
              "rounded-full px-4 py-2 text-[12px] font-semibold transition",
              method === "email"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]",
            ].join(" ")}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setMethod("whatsapp")}
            className={[
              "rounded-full px-4 py-2 text-[12px] font-semibold transition",
              method === "whatsapp"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]",
            ].join(" ")}
          >
            WhatsApp
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <div className="text-[12px] font-semibold text-[var(--muted)]">
            Name <span className="text-[var(--accent)]">*</span>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[14px] outline-none transition focus:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="block">
          <div className="text-[12px] font-semibold text-[var(--muted)]">
            Email <span className="text-[var(--accent)]">*</span>
          </div>
          <input
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[14px] outline-none transition focus:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="[email protected]"
            autoComplete="email"
            inputMode="email"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <div className="text-[12px] font-semibold text-[var(--muted)]">
          Message <span className="text-[var(--accent)]">*</span>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="mt-2 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[14px] leading-6 outline-none transition focus:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] focus:ring-2 focus:ring-[var(--ring)]"
          placeholder="How can I help?"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[13px] text-[var(--muted)]">
          {method === "email"
            ? "Opens your email client with a prefilled message."
            : "Opens WhatsApp with your message prefilled."}
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className={[
            "inline-flex h-12 w-full items-center justify-center rounded-full px-7 text-[14px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto",
            canSubmit
              ? "bg-[var(--accent)] text-white shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:bg-white hover:text-[var(--accent)] hover:border hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] hover:-translate-y-[1px]"
              : "cursor-not-allowed border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)]",
          ].join(" ")}
        >
          {method === "email" ? "Send Email" : "Open WhatsApp"}
        </button>
      </div>

      {status === "success" ? (
        <div className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_25%,transparent)] bg-[var(--accent-wash)] px-4 py-3 text-[13px] leading-6 text-[var(--foreground)]">
          Thank you — your message is ready to send. I’ll respond ASAP.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--foreground)_12%,transparent)] bg-[var(--surface-2)] px-4 py-3 text-[13px] leading-6 text-[var(--muted)]">
          Something went wrong. Please check the required fields and try again,
          or contact me via WhatsApp.
        </div>
      ) : null}
    </form>
  );
}

