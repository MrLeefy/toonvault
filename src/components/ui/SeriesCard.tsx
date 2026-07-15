import Link from "next/link";
import { ComicCover } from "@/components/ui/ComicCover";

type SeriesCardProps = {
  title: string;
  author: string;
  slug: string;
  genre?: string;
  href?: string;
};

export function SeriesCard({ title, author, slug, genre, href }: SeriesCardProps) {
  const content = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#111]">
        <ComicCover title={title} seed={slug} genre={genre} size="md" />
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-bold text-[#111]">{title}</h3>
      <p className="truncate text-xs text-[#999]">{author}</p>
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
