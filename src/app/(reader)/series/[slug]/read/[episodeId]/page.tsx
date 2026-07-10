import { notFound } from "next/navigation";
import { VerticalReader } from "@/components/reader/VerticalReader";
import { getEpisode } from "@/lib/data";

interface ReaderPageProps {
  params: Promise<{ slug: string; episodeId: string }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, episodeId } = await params;
  const result = getEpisode(slug, episodeId);

  if (!result) {
    notFound();
  }

  return (
    <VerticalReader
      series={result.series}
      episode={result.episode}
      prev={result.prev}
      next={result.next}
    />
  );
}
