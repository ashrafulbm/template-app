"use client";

// Inputs, buttons and messages shared by the login and register forms.
import { useState } from "react";

type IconName = "mail" | "lock" | "user";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  icon?: IconName;
};

const inputClassName =
  `peer w-full h-11 rounded-lg border border-slate-200 bg-white/80 px-3.5 text-sm text-slate-900
   shadow-xs placeholder:text-slate-400 transition
   hover:border-slate-300
   focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15
   disabled:opacity-60
   dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500
   dark:hover:border-white/20 dark:focus:border-blue-400 dark:focus:bg-white/[0.07] dark:focus:ring-blue-400/20`;

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {children}
    </label>
  );
}

// The input plus an optional leading icon that turns blue while the input has focus.
function IconInput({ icon, className = "", ...inputProps }: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: IconName;
}) {
  return (
    <>
      <input className={`${inputClassName} ${icon ? "pl-10" : ""} ${className}`} {...inputProps} />
      {icon && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-slate-400
                     transition-colors peer-focus:text-blue-500 dark:text-slate-500 dark:peer-focus:text-blue-400"
        >
          <Icon name={icon} />
        </span>
      )}
    </>
  );
}

export function FormField({ label, name, icon, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <IconInput id={name} name={name} icon={icon} {...inputProps} />
      </div>
    </div>
  );
}

// A password input with a lock icon and a show/hide toggle.
export function PasswordField({ label, name, ...inputProps }: Omit<FormFieldProps, "type" | "icon">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <IconInput
          id={name}
          name={name}
          icon="lock"
          type={visible ? "text" : "password"}
          className="pr-11"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-lg text-slate-400
                     transition-colors hover:text-slate-700 focus:outline-none focus-visible:text-blue-500
                     dark:text-slate-500 dark:hover:text-slate-200"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

export function SubmitButton({ pending, label, pendingLabel }: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg
                 bg-linear-to-b from-blue-500 to-blue-600 px-4 text-sm font-semibold text-white
                 shadow-md shadow-blue-600/25 ring-1 ring-inset ring-white/15 transition
                 hover:from-blue-500 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-600/30
                 active:scale-[0.99]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                 dark:focus-visible:ring-offset-slate-900
                 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending && <SpinnerIcon />}
      {pending ? pendingLabel : label}
      {!pending && (
        <svg aria-hidden viewBox="0 0 20 20" fill="currentColor"
             className="size-4 transition-transform group-hover:translate-x-0.5">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" />
        </svg>
      )}
    </button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex gap-2.5 rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-700 ring-1 ring-inset ring-red-600/15
                 motion-safe:animate-fade-up dark:bg-red-500/10 dark:text-red-300 dark:ring-red-400/20"
    >
      <AlertIcon />
      <p>{message}</p>
    </div>
  );
}

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Icon({ name }: { name: IconName }) {
  return (
    <svg {...iconProps} className="size-[18px]">
      {name === "mail" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
      {name === "lock" && (
        <>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </>
      )}
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg {...iconProps} className="size-[18px]">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg {...iconProps} className="size-[18px]">
      <path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2" />
      <path d="M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-4 animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity={0.3} strokeWidth={3} />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg {...iconProps} strokeWidth={2} className="mt-px size-4 shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
