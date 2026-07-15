import { coverPalette } from "@/lib/cover-style";

type ComicCoverProps = {
  title: string;
  seed: string;
  genre?: string;
  className?: string;
  showTitle?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
};

export function ComicCover({
  title,
  seed,
  genre,
  className = "",
  showTitle = true,
  size = "md",
}: ComicCoverProps) {
  const [c1, c2, c3] = coverPalette(seed);
  const titleSize =
    size === "hero"
      ? "text-2xl leading-tight"
      : size === "lg"
        ? "text-base leading-snug"
        : size === "sm"
          ? "text-[11px] leading-tight"
          : "text-sm leading-snug";

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(155deg, ${c1} 0%, ${c2} 48%, ${c3} 120%)`,
      }}
      aria-hidden={!showTitle}
    >
      <div
        className="absolute -right-6 -top-8 h-28 w-28 rounded-full opacity-30"
        style={{ background: c3 }}
      />
      <div
        className="absolute -bottom-10 -left-8 h-36 w-36 rotate-12 opacity-25"
        style={{ background: c2 }}
      />
      <div
        className="absolute right-3 top-1/3 h-16 w-16 -rotate-12 border-2 opacity-40"
        style={{ borderColor: c3 }}
      />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      {genre && (
        <span className="absolute left-2 top-2 rounded-[2px] bg-black/45 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-[2px]">
          {genre}
        </span>
      )}

      {showTitle && (
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p
            className={`font-black tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${titleSize}`}
          >
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
