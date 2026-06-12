import { stats } from "@/data/portfolio";

export function Marquee() {
  const items = [...stats, ...stats];

  return (
    <div className="overflow-hidden border-y-[3px] border-border bg-fg py-4 text-bg">
      <div className="flex w-max animate-marquee gap-12 px-6">
        {items.map((stat, i) => (
          <div key={`${stat.label}-${i}`} className="flex shrink-0 items-baseline gap-3">
            <span className="font-[family-name:var(--font-syne)] text-4xl font-extrabold">
              {stat.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-bg/70">
              {stat.label}
            </span>
            <span className="text-accent" aria-hidden="true">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
