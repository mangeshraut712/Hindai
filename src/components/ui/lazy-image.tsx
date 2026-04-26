import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string;
  className?: string;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  fallback = "/logo.png",
  className,
  priority = false,
  ...props
}: LazyImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn("transition-opacity duration-300", className)}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
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
