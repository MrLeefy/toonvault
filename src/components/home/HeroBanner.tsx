"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BannerSlide } from "@/lib/types";
import { ComicCover } from "@/components/ui/ComicCover";

type HeroBannerProps = {
  banners: BannerSlide[];
};

export function HeroBanner({ banners }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % banners.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const goToSlide = (index: number) => {
    setActiveIndex((index + banners.length) % banners.length);
  };

  return (
    <section
      className="relative aspect-[5/4] w-full overflow-hidden bg-black sm:aspect-[16/11]"
      aria-label="Featured series"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 40) goToSlide(activeIndex + (distance < 0 ? 1 : -1));
        setTouchStart(null);
      }}
    >
      {banners.map((banner, index) => (
        <Link
          key={banner.id}
          href={`/series/${banner.seriesSlug}`}
          aria-hidden={index !== activeIndex}
          tabIndex={index === activeIndex ? 0 : -1}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ComicCover
            title={banner.title}
            seed={`${banner.seriesSlug}-banner`}
            size="hero"
            showTitle={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-8 pt-16">
            {banner.badge && (
              <span className="mb-2 inline-flex bg-[#00dc64] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-black">
                {banner.badge}
              </span>
            )}
            <h2 className="text-[26px] font-black leading-[1.1] tracking-tight text-white">
              {banner.title}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-[13px] font-medium text-white/85">
              {banner.subtitle}
            </p>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={(e) => {
              e.preventDefault();
              goToSlide(index);
            }}
            className={`h-[3px] rounded-full transition-all ${
              index === activeIndex ? "w-4 bg-[#00dc64]" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
