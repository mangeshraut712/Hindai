import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GurukulHeroProps = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy: string;
  actions?: ReactNode;
  className?: string;
  imageClassName?: string;
};

/**
 * Full-bleed first viewport for tradition / patha hubs.
 * Always pair with artist-impression alt text — not temple photography.
 */
export function GurukulHero({
  src,
  alt,
  eyebrow,
  title,
  copy,
  actions,
  className,
  imageClassName,
}: GurukulHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border/60", className)}>
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className={cn("h-[28rem] w-full object-cover sm:h-[34rem]", imageClassName)}
        sizes="100vw"
        priority
      />
      <div className="theme-media-veil absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {copy}
        </p>
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        <p className="mt-4 text-[11px] tracking-wide text-muted-foreground/80">
          Artist impression · not a photograph of a living temple murti
        </p>
      </div>
    </section>
  );
}

type GurukulFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
};

export function GurukulFigure({
  src,
  alt,
  caption = "Artist impression · not a temple photograph",
  className,
  priority = false,
}: GurukulFigureProps) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border/60", className)}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
        priority={priority}
      />
      <figcaption className="bg-muted/40 px-4 py-3 text-xs leading-5 text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
