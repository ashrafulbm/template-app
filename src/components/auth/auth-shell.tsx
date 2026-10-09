// The page frame around the login and register forms:
// a centered glass card over a soft gradient backdrop, branded from siteConfig.
import { siteConfig } from "@/config/site";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

// Cached so the prerender doesn't read the clock (Cache Components rejects a bare `new Date()`).
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden
                 bg-white px-4 py-12 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      {/* Backdrop: blurred color blobs + a dot grid that fades out toward the edges */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full
                        bg-linear-to-r from-blue-400/40 via-indigo-400/30 to-fuchsia-400/30 blur-3xl
                        dark:from-blue-600/25 dark:via-indigo-600/20 dark:to-fuchsia-600/15" />
        <div className="absolute inset-0 text-slate-900/[0.07] dark:text-white/[0.06]
                        [background-image:radial-gradient(currentColor_1px,transparent_1px)]
                        [background-size:22px_22px]
                        [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="w-full max-w-[400px] motion-safe:animate-fade-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <span
            aria-hidden
            className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600
                       text-lg font-bold text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/20"
          >
            {siteConfig.name.charAt(0)}
          </span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>

        <div
          className="rounded-2xl bg-white/70 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/10
                     backdrop-blur-xl sm:p-8 dark:bg-slate-900/60 dark:shadow-black/20 dark:ring-white/10"
        >
          {children}
        </div>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">{footer}</p>
      </div>

      <span className="absolute bottom-6 text-xs text-slate-400 dark:text-slate-500">
        © <CurrentYear /> {siteConfig.name}
      </span>
    </main>
  );
}
