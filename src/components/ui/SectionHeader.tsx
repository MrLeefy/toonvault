import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  href?: string;
};

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-extrabold tracking-tight text-tv-ink">{title}</h2>
      {href ? (
        <Link href={href} className="shrink-0 text-sm font-semibold text-tv-green">
          See all
        </Link>
      ) : null}
    </div>
  );
}
