"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export const SafeImage = ({
  src,
  fallbackSrc = "https://picsum.photos/seed/fallback/1920/1080",
  alt,
  ...props
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || ""}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
