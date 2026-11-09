import { useMutation } from "convex/react";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Github,
  Linkedin,
  Loader2,
  Lock,
  Mail,
  Send,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { profile } from "@/data/profile";
import { Reveal, SceneMarker } from "@/components/common/Reveal";

const INTENTS = [
  "Collaboration",
  "Internship opportunity",
  "Project / freelance",
  "Just saying hello",
];

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; at: number }
  | { state: "error"; detail: string };

export function ContactPortal({
  onNavigate,
}: {
  onNavigate: (id: string) => void;
}) {
  const send = useMutation(api.messages.send);
  const [form, setForm] = useState({
    name: "",
    email: "",
    intent: INTENTS[0],
    message: "",
  });
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) {
      setStatus({ state: "error", detail: "Please add your name." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus({ state: "error", detail: "Please add a valid email address." });
      return;
    }
    if (message.length < 12) {
      setStatus({
        state: "error",
        detail: "Tell me a little more — at least 12 characters.",
      });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const result = await send({
        name,
        email,
        intent: form.intent,
        message,
      });
      setStatus({ state: "success", at: result.receivedAt });
      setForm({ name: "", email: "", intent: INTENTS[0], message: "" });
    } catch (error) {
      setStatus({
        state: "error",
        detail:
          error instanceof Error && error.message
            ? error.message.replace(/^Uncaught Error:\s*/, "")
            : "The message could not be saved. Please email me directly.",
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pt-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,rgba(5,7,6,0.55)_0%,rgba(5,7,6,0.7)_55%,rgba(5,7,6,0.92)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <Reveal>
          <SceneMarker scene="07" label="The Connection Portal" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="contact-title"
            className="mt-10 max-w-5xl font-display text-[clamp(2.5rem,6vw,6rem)] font-medium leading-[0.94] tracking-[-0.05em]"
          >
            Have an idea?
            <br />
            Let&apos;s build something{" "}
            <span className="font-serif italic text-emerald">
              extraordinary.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="max-w-sm text-sm leading-relaxed text-[#c8d6cf]">
                Whether it&apos;s a product to build, a research idea to
                pressure-test or a team that needs another engineer — the
                portal is open.
              </p>

              <div className="mt-10">
                <p className="label-mono text-muted-foreground/60">Direct line</p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="border-b border-emerald/30 pb-1 text-lg tracking-tight text-foreground transition-colors hover:border-emerald hover:text-emerald sm:text-xl"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-emerald/40 hover:text-emerald"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
                <p aria-live="polite" className="mt-2 h-4 font-mono text-[8px] uppercase tracking-[0.14em] text-emerald/60">
                  {copied ? "Copied to clipboard" : ""}
                </p>
              </div>

              <div className="mt-6 grid gap-px overflow-hidden border border-white/[0.09] bg-white/[0.07] sm:grid-cols-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 bg-[#060f0b] p-4 transition-colors hover:bg-[#0a1811]"
                >
                  <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-foreground">
                    <Github className="size-4 text-emerald/70" />
                    GitHub
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 bg-[#060f0b] p-4 transition-colors hover:bg-[#0a1811]"
                >
                  <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-foreground">
                    <Linkedin className="size-4 text-emerald/70" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {profile.availability.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald/20 bg-emerald/[0.04] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-emerald/70"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 border-t border-white/[0.09] pt-6">
                <p className="label-mono text-muted-foreground/60">Resume</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <a
                    href={profile.resume}
                    download="Mohd-Ali-Pathan-Resume-Placeholder.pdf"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-emerald/50 hover:text-emerald"
                  >
                    <Download className="size-3.5" />
                    Download resume
                  </a>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-amber-100/40">
                    <FileText className="size-3" />
                    Placeholder PDF
                  </span>
                </div>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground/40">
                  Replace public/resume-placeholder.pdf
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.14}>
              <div className="border border-white/[0.1] bg-[#060f0b]/85 p-5 backdrop-blur-md sm:p-7">
                <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                  <div>
                    <p className="label-mono text-emerald/70">
                      Open a channel
                    </p>
                    <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                      Send a signal
                    </h3>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground/60">
                    <Lock className="size-2.5" />
                    private inbox
                  </span>
                </div>

                <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="label-mono text-muted-foreground/70">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, name: event.target.value }))
                        }
                        placeholder="Your name"
                        maxLength={80}
                        className="contact-field mt-2 w-full px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="label-mono text-muted-foreground/70">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, email: event.target.value }))
                        }
                        placeholder="you@domain.com"
                        maxLength={160}
                        className="contact-field mt-2 w-full px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-intent" className="label-mono text-muted-foreground/70">
                      This is about
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="contact-intent"
                        name="intent"
                        value={form.intent}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, intent: event.target.value }))
                        }
                        className="contact-field w-full appearance-none px-3 py-2.5 pr-9 text-sm"
                      >
                        {INTENTS.map((intent) => (
                          <option key={intent} value={intent} className="bg-[#08110d]">
                            {intent}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="contact-message" className="label-mono text-muted-foreground/70">
                        Message
                      </label>
                      <span className="font-mono text-[8px] text-muted-foreground/40">
                        {form.message.length} / 2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, message: event.target.value }))
                      }
                      placeholder="What are you imagining? A sentence is enough to start."
                      rows={4}
                      maxLength={2000}
                      className="contact-field mt-2 w-full resize-y px-3 py-2.5 text-sm"
                    />
                  </div>

                  <div aria-live="polite" role="status" className="min-h-[1.25rem]">
                    {status.state === "error" && (
                      <p className="text-xs leading-relaxed text-red-300/90">
                        {status.detail}
                      </p>
                    )}
                    {status.state === "success" && (
                      <div className="flex items-start gap-2 border border-emerald/25 bg-emerald/[0.06] p-3">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-emerald" />
                        <div>
                          <p className="text-xs text-emerald">
                            Signal received. Your message is in the private inbox.
                          </p>
                          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-emerald/50">
                            {new Date(status.at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status.state === "sending"}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#03130c] transition-all hover:bg-[#5ff0c0] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status.state === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="flex items-start gap-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground/40">
                    <Lock className="mt-0.5 size-2.5 shrink-0" />
                    Stored in a private Convex inbox. Not shared, not sold. Prefer
                    email?{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="underline decoration-emerald/30 underline-offset-2 hover:text-emerald"
                    >
                      Write directly
                    </a>
                    .
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        <footer className="mt-28 border-t border-white/[0.09] pt-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="font-display text-[clamp(3.2rem,11vw,9rem)] font-medium leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(200,231,218,0.28)]">
                  ALIVERSE
                </p>
                <p className="mt-4 max-w-md font-serif text-lg italic text-emerald/80">
                  A universe built by imagination, engineering and code.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-[#c8d6cf] transition-colors hover:text-emerald"
                >
                  <Mail className="size-4" />
                  {profile.email}
                </a>
                <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-emerald"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-emerald"
                  >
                    LinkedIn
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate("awakening")}
                    className="transition-colors hover:text-emerald"
                  >
                    Top
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                © 2026 Mohd Ali Pathan · All work documented as stated
              </p>
              <div className="flex flex-wrap items-center gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                <span>React · Three.js · Convex</span>
                <span className="hidden size-1 rounded-full bg-emerald/40 sm:block" />
                <a
                  href="/studio"
                  className="transition-colors hover:text-emerald/80"
                >
                  Studio
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
