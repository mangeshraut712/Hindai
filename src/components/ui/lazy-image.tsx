import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string;
  className?: string;
}

export function LazyImage({
  src,
  alt,
  fallback = "/logo.png",
  className,
  ...props
}: LazyImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn("transition-opacity duration-300", className)}
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (fallback) {
            target.src = fallback;
          }
        }}
      />
    </div>
  );
}
