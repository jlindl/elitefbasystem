import Image, { type ImageProps } from "next/image";
import { blur } from "./blur-data";

type PhotoProps = Omit<ImageProps, "src"> & { src: string };

/** next/image for files in /public, with a blurred preview while it loads. */
export function Photo({ src, alt, ...props }: PhotoProps) {
  const preview = blur[src];
  return (
    <Image
      src={src}
      alt={alt}
      placeholder={preview ? "blur" : "empty"}
      blurDataURL={preview}
      {...props}
    />
  );
}
