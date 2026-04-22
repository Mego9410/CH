import Link from "next/link";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--border)]">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="font-semibold tracking-tight">Chronicle Health</div>
            <p className="text-[14px] leading-6 text-[var(--muted)]">
              Personal health data organisation - not a medical device, not
              medical software, and not a substitute for clinical judgement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-3">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                Pages
              </div>
              <ul className="space-y-2 text-[14px]">
                <li>
                  <Link className="hover:underline" href="/for-you">
                    For You?
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/how-it-works">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                Legal
              </div>
              <ul className="space-y-2 text-[14px]">
                <li>
                  <Link className="hover:underline" href="/privacy">
                    Privacy Notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--border)] pt-8 text-[12px] leading-5 text-[var(--muted)]">
          <div>© 2026 Chronicle Health. All rights reserved.</div>
          <div>
            Registered in England &amp; Wales. Company No. 16934023 | ICO
            Registration No. ZC084723
          </div>
          <div>
            71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H
            9JQ
          </div>
        </div>
      </Container>
    </footer>
  );
}

