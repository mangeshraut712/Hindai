import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FestivalRadio } from "@/components/ganeshotsav/festival-radio";
import { MUMBAI_STOPS, PUNE_STOPS, type GaneshDarshanStop } from "@/lib/data/ganeshotsav-guide";
import { SITE_URL, publicUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ganeshotsav 2026: Pune, Mumbai, home puja and bhaktigeet",
  description:
    "A detailed Ganesh festival companion: Pune's Manache 5 and Dagdusheth, Mumbai mandals, home morning and evening aarti, Satyanarayan puja, history and songs.",
  alternates: { canonical: `${SITE_URL}/ganeshotsav` },
};

function MapLink({ query, children }: { query: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold text-amber-800 underline underline-offset-4 dark:text-amber-300"
    >
      {children}
    </a>
  );
}

function StopCard({ stop, index }: { stop: GaneshDarshanStop; index: number }) {
  return (
    <li className="rounded-3xl border border-amber-900/15 bg-white p-6 shadow-sm dark:border-amber-100/15 dark:bg-stone-900">
      <div className="flex items-start gap-4">
        <span className="font-serif text-4xl leading-none text-amber-700 dark:text-amber-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-serif text-2xl text-stone-900 dark:text-amber-50">{stop.name}</h3>
          <p className="mt-1 font-devanagari text-sm text-amber-800 dark:text-amber-300">
            {stop.marathi}
          </p>
          <p className="mt-2 text-sm font-medium text-stone-500 dark:text-stone-400">{stop.area}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-stone-700 dark:text-stone-300">{stop.story}</p>
      <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
        {stop.visitNote}
      </p>
      <div className="mt-4 flex flex-wrap gap-5">
        <MapLink query={stop.mapQuery}>Open location ↗</MapLink>
        <a
          href={stop.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-600 underline underline-offset-4 dark:text-stone-300"
        >
          {stop.sourceLabel} ↗
        </a>
      </div>
    </li>
  );
}

const puneDirections = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(PUNE_STOPS[0].mapQuery)}&destination=${encodeURIComponent(PUNE_STOPS[5].mapQuery)}&waypoints=${encodeURIComponent(
  PUNE_STOPS.slice(1, 5)
    .map((stop) => stop.mapQuery)
    .join("|")
)}&travelmode=walking`;

export default function GaneshotsavPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-[#f8f1e6] text-stone-900 dark:bg-stone-950 dark:text-amber-50"
      >
        <section className="relative isolate min-h-[610px] overflow-hidden bg-[#2a120d] text-white">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={publicUrl("/ganeshotsav/hero-mobile.webp")}
            />
            <img
              src={publicUrl("/ganeshotsav/hero.webp")}
              alt="Illustrated Ganesh festival scene from the ganeshai project"
              className="absolute inset-0 h-full w-full object-cover opacity-65"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/55 to-transparent" />
          <div className="relative mx-auto flex min-h-[610px] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              A city, a home, a song · 2026
            </p>
            <h1 className="mt-7 max-w-3xl font-serif text-6xl leading-[0.95] sm:text-7xl">
              Ganpati Bappa
              <br />
              <em className="text-amber-300">Morya.</em>
            </h1>
            <p className="mt-7 max-w-2xl font-devanagari text-2xl">
              गणेशोत्सव · पुणे ते मुंबई · घराघरांतला बाप्पा
            </p>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/85">
              Walk Pune’s five Ganpatis of honour, plan Mumbai darshan, keep an aarti rhythm at
              home, and let the old bhaktigeet play.
            </p>
            <nav
              aria-label="On this page"
              className="mt-9 flex flex-wrap gap-3 text-sm font-semibold"
            >
              {[
                ["Pune route", "#pune"],
                ["Mumbai darshan", "#mumbai"],
                ["11-day home guide", "#home"],
                ["Festival radio", "#radio"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-full border border-white/35 bg-white/10 px-5 py-3 backdrop-blur hover:bg-white/25"
                >
                  {label} →
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="border-y border-amber-900/10 bg-amber-100/75 px-5 py-5 text-center text-sm leading-7 text-stone-800 dark:bg-stone-900 dark:text-stone-200">
          <strong>2026:</strong> Ganesh Chaturthi is <strong>14 September</strong>; Anant
          Chaturdashi is <strong>25 September</strong>. Families choose their own installation and
          immersion duration. Follow your local panchang and mandal notices for ritual and queue
          timing.
        </section>

        <section id="pune" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
            01 / पुणे
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">The Manache 5, plus Dagdusheth</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-700 dark:text-stone-300">
            The ceremonial order is Kasba, Tambdi Jogeshwari, Guruji Talim, Tulshibaug and
            Kesariwada. Dagdusheth is a beloved additional darshan, shown between stops two and
            three for a practical old-city walk. It does not take a Manacha number.
          </p>
          <a
            href={puneDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-full bg-amber-800 px-6 py-3 text-sm font-bold text-white hover:bg-amber-700"
          >
            Open suggested walking route ↗
          </a>
          <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
            Map lines are approximate. Festival barricades and signed pedestrian queues decide the
            real route.
          </p>
          <ol className="mt-9 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
            {PUNE_STOPS.map((stop, index) => (
              <StopCard key={stop.name} stop={stop} index={index} />
            ))}
          </ol>
          <div className="mt-8 rounded-3xl border border-amber-800/20 bg-amber-100/70 p-7 dark:bg-stone-900">
            <h3 className="font-serif text-2xl">Dagdusheth: plan the queue</h3>
            <p className="mt-3 text-sm leading-7">
              The Trust’s published daily schedule includes morning, midday and night aartis;
              festival arrangements can differ. Check its current notice before travel. Keep luggage
              light, allow extra time for security and darshan, use marked entrances, and do not
              block through lanes for photos. Visit early if your priority is a calmer walk; evening
              lighting draws larger crowds.
            </p>
            <a
              href="https://www.dagdushethganpati.com/?p=11253"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold underline underline-offset-4"
            >
              Official Trust timings and 2026 notice ↗
            </a>
          </div>
        </section>

        <section id="mumbai" className="scroll-mt-20 bg-stone-900 px-5 py-20 text-amber-50 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              02 / मुंबई
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Lalbaug on foot. The rest by separate trip.
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-stone-300">
              Start with Mumbaicha Raja at Ganesh Galli, then join the separate Lalbaugcha Raja
              line. For the 2026 festival, Lalbaugcha Raja’s published queue cutoffs are on 24
              September; verify again before leaving. King’s Circle and Andheri are not part of the
              same walking circuit.
            </p>
            <ol className="mt-9 grid list-none gap-5 p-0 md:grid-cols-2">
              {MUMBAI_STOPS.map((stop, index) => (
                <StopCard key={stop.name} stop={stop} index={index} />
              ))}
            </ol>
            <p className="mt-7 text-sm leading-7 text-stone-300">
              For a family visit, choose one area per outing, carry water, and use local train or
              Metro where practical. Check each mandal’s official line status and local police
              traffic advisories on the day. GSB’s 2026 five-day festival ended on 18 September.
            </p>
          </div>
        </section>

        <section id="home" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
            03 / घरचा गणेशोत्सव
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">A steady home rhythm for 11 days</h2>
          <p className="mt-5 max-w-3xl leading-8 text-stone-700 dark:text-stone-300">
            Use this as a household plan when you keep Bappa for eleven days. The festival’s tithi
            count and Gregorian dates do not always align one-to-one; let your family’s installation
            and visarjan practice set the actual days.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl bg-white p-7 dark:bg-stone-900">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Every morning · suggested 7 am
              </span>
              <h3 className="mt-3 font-serif text-2xl">Wake the mandap</h3>
              <p className="mt-3 text-sm leading-7">
                Clean the space, light a lamp safely, offer fresh water, flowers or durva, and food
                suitable to your tradition. Recite a short Ganapati prayer and sing Sukhakarta
                Dukhharta. Share prasad.
              </p>
            </article>
            <article className="rounded-3xl bg-white p-7 dark:bg-stone-900">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Every evening · suggested 7 pm
              </span>
              <h3 className="mt-3 font-serif text-2xl">Gather for aarti</h3>
              <p className="mt-3 text-sm leading-7">
                Bring the family together for aarti, one bhajan or Atharvashirsha if familiar, a
                moment of gratitude, then prasad. The times here are a home suggestion, not a
                prescribed muhurta.
              </p>
            </article>
            <article className="rounded-3xl bg-white p-7 dark:bg-stone-900">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                One chosen day
              </span>
              <h3 className="mt-3 font-serif text-2xl">Satyanarayan puja</h3>
              <p className="mt-3 text-sm leading-7">
                Choose a day that suits the household. Prepare the puja, recite the five-part katha
                from your family book or a checked edition, complete aarti, then distribute prasad
                and food.
              </p>
            </article>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ganesh-aarti"
              className="rounded-full bg-amber-800 px-6 py-3 text-sm font-bold text-white"
            >
              Open Ganesh aarti sangrah →
            </Link>
            <Link
              href="/satyanarayan-puja"
              className="rounded-full border border-amber-800 px-6 py-3 text-sm font-bold text-amber-900 dark:text-amber-200"
            >
              Satyanarayan puja guide →
            </Link>
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
            On the final day, offer a last aarti and naivedya, thank Ganesha, then follow the local
            immersion rules. Prefer an approved collection or immersion point and keep the waterway
            and footpath clear.
          </p>
        </section>

        <section id="radio" className="scroll-mt-20 bg-[#321510] px-5 py-20 text-amber-50 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              04 / भक्तिगीते
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">The ganeshai festival radio</h2>
            <p className="my-6 max-w-3xl leading-8 text-amber-100/80">
              A small listening shelf drawn from your{" "}
              <a
                href="https://github.com/mangeshraut712/ganeshai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                ganeshai project
              </a>
              . All 30 tracks from the original radio are here in its intentional order, from
              procession songs through Marathi classics, aartis and mantras.
            </p>
            <FestivalRadio />
            <a
              href="https://mangeshraut712.github.io/ganeshai/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-semibold underline underline-offset-4"
            >
              Open the original ganeshai radio ↗
            </a>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 text-sm leading-7 text-stone-600 dark:text-stone-300 sm:px-8">
          <h2 className="font-serif text-3xl text-stone-900 dark:text-amber-50">
            History, sources and visit notes
          </h2>
          <p className="mt-4 max-w-4xl">
            Home Ganapati worship is older than the public mandal festival. Pune’s honour sequence
            recalls old-city mandals; Lokmanya Tilak’s public Ganeshotsav helped turn worship into a
            shared civic gathering. Mumbai’s mandals developed their own neighbourhood histories,
            from Ganesh Galli’s 1928 founding to Lalbaug’s market community. Individual stories
            above link to the relevant mandal, trust or government record.
          </p>
          <p className="mt-4">
            Visit information checked 23 September 2026. For live queue, closure and traffic
            information, use the linked official mandal pages and local authorities before setting
            out.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
