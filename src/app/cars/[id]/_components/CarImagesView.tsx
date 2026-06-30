"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  carName: string;
};

export default function CarImagesView({ images, carName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images?.length) return null;

  const selectedImage = images[selectedIndex];

  return (
    <div className="pt-4">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 h-100">
        {/* Main Image */}
        <div className="col-span-3 md:col-span-2 md:row-span-2 relative h-75 md:h-full rounded-3xl overflow-hidden">
          <Image
            src={selectedImage}
            alt={carName}
            fill
            priority
            loading="eager"
            className="object-cover transition duration-700 hover:scale-105"
          />
        </div>

        {/* Thumbnails */}
        {images.slice(1).map((img, index) => {
          const realIndex = index + 1;
          const isActive = selectedIndex === realIndex;

          return (
            <div
              key={index}
              onClick={() => setSelectedIndex(realIndex)}
              className={`
                relative rounded-3xl overflow-hidden cursor-pointer
                h-22.5 md:h-50
                ${index === images.slice(1).length - 1 ? "md:col-span-2" : ""}
              `}
            >
              <Image
                src={img}
                alt={`${carName}-${realIndex}`}
                fill
                priority
                loading="eager"
                className={`object-cover transition duration-700 hover:scale-105 ${
                  isActive ? "ring-2 ring-primary scale-[1.02]" : ""
                }`}
              />

              {index === images.slice(1).length - 1 && (
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 px-2 py-1 md:px-4 md:py-2 bg-white/90 rounded-full text-[10px] md:text-xs font-semibold">
                  View All Photos
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
