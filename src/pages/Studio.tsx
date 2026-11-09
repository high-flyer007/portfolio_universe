import { useQuery } from "convex/react";
import { ArrowLeft, Inbox, LogOut, Lock, Mail } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export default function Studio() {
  const { user, signOut } = useAuth();
  const inbox = useQuery(api.messages.listForOwner);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#050706] px-5 py-8 text-foreground sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.09] pb-5">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-emerald"
            >
              <ArrowLeft className="size-3" />
              Back to ALIVERSE
            </a>
            <h1 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Studio <span className="font-serif italic text-emerald">inbox</span>
            </h1>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground">
              Messages sent through the Connection Portal, stored in Convex.
              Visible only to the site owner.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/60 sm:block">
              {user?.email ?? "signed in"}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-emerald/40 hover:text-emerald"
            >
              <LogOut className="size-3.5" />
              Sign out
            </button>
          </div>
        </header>

        {inbox === undefined && (
          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
            Reading the inbox
          </div>
        )}

        {inbox && !inbox.authorized && (
          <div className="mt-10 border border-amber-100/15 bg-amber-100/[0.02] p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-amber-100/60">
              <Lock className="size-3.5" />
              Not authorised
            </div>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              This inbox is private. The signed-in account is{" "}
              <span className="text-foreground">
                {user?.email ?? "unknown"}
              </span>
              , which is not the owner of this portfolio.
            </p>
            <a
              href="mailto:m.alipathan2905@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-emerald hover:text-white"
            >
              <Mail className="size-3.5" />
              Contact the owner
            </a>
          </div>
        )}

        {inbox?.authorized && inbox.messages.length === 0 && (
          <div className="mt-10 border border-dashed border-white/12 p-10 text-center">
            <Inbox className="mx-auto size-6 text-muted-foreground/40" />
            <p className="mt-4 font-serif text-xl italic text-[#dcebe3]">
              No signals yet.
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/50">
              New messages from the Contact portal will appear here
            </p>
          </div>
        )}

        {inbox?.authorized && inbox.messages.length > 0 && (
          <ul className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {inbox.messages.map((message) => (
              <li key={message._id} className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <p className="font-display text-lg font-medium">
                      {message.name}
                    </p>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-xs text-emerald/70 transition-colors hover:text-emerald"
                    >
                      {message.email}
                    </a>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                  {message.intent}
                </p>
                <p className="mt-3 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-[#c8d6cf]">
                  {message.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
