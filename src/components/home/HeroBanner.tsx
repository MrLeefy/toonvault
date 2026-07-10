"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { BannerSlide } from "@/lib/types";

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
    }, 4000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const goToSlide = (index: number) => {
    setActiveIndex((index + banners.length) % banners.length);
  };

  return (
    <section
      className="relative h-[56vw] max-h-[280px] min-h-[210px] w-full overflow-hidden bg-zinc-900"
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
          <Image
            src={banner.image}
            alt=""
            fill
            priority={index === 0}
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            {banner.badge && (
              <span className="mb-1.5 inline-flex rounded-sm bg-[#00d66f] px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-black">
                {banner.badge}
              </span>
            )}
            <h2 className="text-xl font-bold leading-tight tracking-tight">{banner.title}</h2>
            <p className="mt-1 text-xs font-medium text-white/90">{banner.subtitle}</p>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-3 right-3 z-10 flex gap-1.5" aria-label="Banner slides">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? "w-4 bg-[#00d66f]" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
