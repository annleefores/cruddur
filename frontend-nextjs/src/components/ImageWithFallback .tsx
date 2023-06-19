import React, { useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  src: string | StaticImageData;
  fallbackSrc: StaticImageData;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
