/**
 * CSS-only fallback atmosphere. Shown while the WebGL scene loads or when the
 * device/browser cannot create a WebGL context.
 */
export function Atmosphere({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050706]" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,227,155,0.16),rgba(8,35,25,0.06)_45%,transparent_70%)]" />
      <div className="absolute left-[62%] top-[38%] h-[34vmin] w-[34vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/25" />
      <div className="absolute left-[62%] top-[38%] h-[44vmin] w-[44vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/10" />
      {!subtle && (
        <>
          <div className="absolute left-[16%] top-[22%] h-[1px] w-[26vw] bg-gradient-to-r from-transparent via-emerald/25 to-transparent" />
          <div className="absolute left-[8%] bottom-[26%] h-[1px] w-[34vw] bg-gradient-to-r from-emerald/20 via-emerald/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent_20%,#050706_95%)]" />
        </>
      )}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(43,227,155,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(43,227,155,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
}
