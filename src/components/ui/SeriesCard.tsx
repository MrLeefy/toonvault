import Image from "next/image";
import Link from "next/link";

type SeriesCardProps = {
  title: string;
  author: string;
  cover: string;
  href?: string;
  priority?: boolean;
};

export function SeriesCard({
  title,
  author,
  cover,
  href,
  priority = false,
}: SeriesCardProps) {
  const content = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-tv-bg-soft">
        <Image
          src={cover}
          alt={`${title} cover`}
          fill
          sizes="(max-width: 480px) 36vw, 172px"
          priority={priority}
          className="object-cover"
        />
      </div>
      <h3 className="mt-2 truncate text-sm font-bold text-tv-ink">{title}</h3>
      <p className="truncate text-xs text-tv-muted">{author}</p>
    </>
  );

  const className = "block min-w-0";

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}
