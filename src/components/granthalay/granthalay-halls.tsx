import Image from "next/image";
import Link from "next/link";
import { GRANTHALAY_HALLS, type GranthalayDepth, type GranthalayMedium } from "@/lib/granthalay";
import { publicUrl } from "@/lib/site";

const DEPTH_LABEL: Record<GranthalayDepth, string> = {
  full: "Full text",
  hymn: "Hymn",
  katha: "Story guide",
  place: "Place",
  catalog: "Catalog",
};

const MEDIA_LABEL: Record<GranthalayMedium, string> = {
  text: "Text",
  image: "Image",
  audio: "Audio",
  ask: "Ask",
};

export function GranthalayHalls() {
  return (
    <section
      id="halls"
      className="border-border/60 scroll-mt-28 border-b px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow">Reading rooms • वाचनालय</p>
          <h2 className="section-title mt-4">Open a hall, then a book.</h2>
          <p className="section-copy mt-4">
            Original texts and story guides are marked separately. Devanagari is a script shared by
            Sanskrit, Marathi, Hindi and other languages; each shelf notes what it actually stores.
            The catalog at the end still contains incomplete Vedas, Upanishads and Puranas.
          </p>
        </div>
        <div className="mt-12 space-y-16">
          {GRANTHALAY_HALLS.map((hall) => (
            <article key={hall.id} id={hall.id} className="scroll-mt-28">
              <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
                <figure className="border-border/60 overflow-hidden rounded-2xl border">
                  <Image
                    src={publicUrl(hall.image)}
                    alt={hall.imageAlt}
                    width={640}
                    height={800}
                    className="h-52 w-full object-cover lg:h-64"
                  />
                </figure>
                <div>
                  <p className="font-devanagari text-primary">{hall.sanskrit}</p>
                  <h3 className="mt-1 font-serif text-3xl">{hall.title}</h3>
                  <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
                    {hall.description}
                  </p>
                  <ul className="divide-border/70 border-border/70 mt-6 divide-y border-y">
                    {hall.shelves.map((shelf) => (
                      <li key={shelf.href}>
                        <Link
                          href={shelf.href}
                          className="group grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                        >
                          <span>
                            <span className="font-devanagari text-primary block text-sm">
                              {shelf.sanskrit}
                            </span>
                            <span className="group-hover:text-primary mt-0.5 block text-lg font-semibold">
                              {shelf.title}
                            </span>
                            <span className="text-muted-foreground mt-1 block text-sm">
                              {shelf.note}
                            </span>
                          </span>
                          <span className="text-muted-foreground flex flex-wrap gap-2 text-[11px] tracking-[0.14em] uppercase">
                            <span className="border-border rounded-full border px-2 py-1">
                              {DEPTH_LABEL[shelf.depth]}
                            </span>
                            {shelf.media.map((medium) => (
                              <span
                                key={medium}
                                className="border-border rounded-full border px-2 py-1"
                              >
                                {MEDIA_LABEL[medium]}
                              </span>
                            ))}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
