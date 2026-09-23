import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import satyanarayanText from "@/lib/data/satyanarayan-katha.json";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Satyanarayan puja during Ganeshotsav: five-chapter reading guide",
  description:
    "Read all five Satyanarayan katha chapters offline with a household puja sequence, English chapter guide and source attribution.",
  alternates: { canonical: `${SITE_URL}/satyanarayan-puja` },
};

const chapters = [
  {
    number: 1,
    title: "The vow is taught",
    summary:
      "Narada asks how people facing hardship may find relief. Vishnu describes the Satyanarayan vow: worship with devotion, listen to the katha, offer prasad within one's means and share it. This opening chapter gives the purpose and basic observance of the vow.",
    summaryMr:
      "नारद मुनी लोकांचे दुःख दूर करण्याचा उपाय विचारतात. भगवान विष्णू त्यांना सत्यनारायण व्रत सांगतात: आपल्या ऐपतीप्रमाणे पूजा करावी, कथा ऐकावी आणि प्रसाद सर्वांना वाटावा. या अध्यायात व्रताचा हेतू व साधी पद्धत येते.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३३",
  },
  {
    number: 2,
    title: "The Brahmin and the woodcutter",
    summary:
      "Vishnu, in the form of an elderly Brahmin, teaches a poor Brahmin in Kashi. The man performs the vow with what he receives, and a woodcutter who sees the worship follows his example. He uses his day's earnings for an offering and shares it with his family.",
    summaryMr:
      "काशीतील दरिद्री ब्राह्मणाला भगवान वृद्ध ब्राह्मणाच्या रूपात व्रत सांगतात. मिळालेल्या भिक्षेतून तो पूजा करतो. त्याची पूजा पाहून एका लाकूड विकणाऱ्याला व्रत समजते; तोही दिवसभराच्या कमाईतून नैवेद्य तयार करून कुटुंबासह पूजा करतो.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३४",
  },
  {
    number: 3,
    title: "The merchant's unfulfilled promise",
    summary:
      "King Ulkamukha's worship inspires a merchant to promise the vow when he has a child. A daughter is born and married, but he still delays. During a trading journey he and his son-in-law are wrongly imprisoned. His daughter Kalavati hears the katha; his wife Lilavati performs the vow, and the two men are freed.",
    summaryMr:
      "राजा उल्कामुखाची पूजा पाहून साधू नावाचा व्यापारी संतती झाल्यावर व्रत करण्याचा संकल्प करतो. कलावतीचा जन्म व विवाह होतो, तरी तो संकल्प पुढे ढकलतो. व्यापारासाठी गेलेला व्यापारी व जावई चोरीच्या आरोपावरून कैद होतात. कलावती कथा ऐकते, लीलावती व्रत करते आणि दोघांची सुटका होते.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३५",
  },
  {
    number: 4,
    title: "The merchant's return and the prasad",
    summary:
      "On the return journey the merchant gives a dismissive answer to a disguised ascetic and his cargo seems to vanish. He apologises, performs worship and continues home. Kalavati rushes to greet her husband without taking the prasad; the story turns again when she goes back, receives it and returns.",
    summaryMr:
      "परतीच्या वाटेवर साधू व्यापारी दंडीवेषातील भगवंताला उपेक्षेने उत्तर देतो आणि नौकेतील धन नाहीसे झाल्यासारखे दिसते. चूक मान्य करून तो पूजा करतो. घरी कलावती प्रसाद न घेता पतीला भेटायला धावते; पती अदृश्य झाल्यावर ती परत जाऊन प्रसाद घेते आणि मग त्याची पुन्हा भेट होते.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३६",
  },
  {
    number: 5,
    title: "King Tungadhvaja and the closing praise",
    summary:
      "King Tungadhvaja passes cowherds performing the vow and dismisses their offering. After losses, he returns to their worship and receives prasad. The chapter closes with the fruits of faithful observance and later lives of the characters. End the reading with gratitude, aarti and distribution of the offered food.",
    summaryMr:
      "राजा तुंगध्वज गोपांची सत्यनारायण पूजा पाहतो, पण गर्वाने त्यांचा प्रसाद स्वीकारत नाही. हानी झाल्यावर तो चूक ओळखून त्यांच्याबरोबर पूजा करतो आणि प्रसाद घेतो. शेवटी व्रतश्रवणाचे फल आणि कथेतल्या पात्रांच्या पुढील जन्मांचे वर्णन येते. मग आरती करून प्रसाद वाटावा.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३७",
  },
] as const;

export default function SatyanarayanPujaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-[#f8f1e6] text-stone-900 dark:bg-stone-950 dark:text-amber-50"
      >
        <section className="bg-[#381b15] px-5 py-20 text-amber-50 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/ganeshotsav"
              className="text-sm text-amber-200 underline underline-offset-4"
            >
              ← Ganeshotsav home guide
            </Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              एक दिवस · सत्यनारायण पूजा
            </p>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl">A day for Satyanarayan</h1>
            <p className="mt-5 max-w-3xl font-devanagari text-xl text-amber-100">
              कथा, आरती आणि प्रसाद · घरच्या परंपरेनुसार
            </p>
            <p className="mt-5 max-w-3xl leading-8 text-amber-50/80">
              Choose one day of your home Ganeshotsav for the puja. The five-chapter katha may be
              read by the family or priest in the language and edition your household follows.
            </p>
            <p className="mt-3 max-w-3xl font-devanagari leading-8 text-amber-50/80">
              घरच्या गणेशोत्सवात एक दिवस सत्यनारायण पूजेसाठी ठेवा. मूळ संस्कृत पाठ आणि त्याचा मराठी
              अर्थ वेगळा ओळखून वाचा.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <div className="rounded-3xl border border-amber-800/20 bg-amber-100/70 p-6 text-sm leading-7 dark:bg-stone-900">
            <strong>About this edition:</strong> All five chapters below are available on this page
            offline. They reproduce the Sanskrit Wikisource community transcription, including its
            Hindi explanations, as retrieved on 23 September 2026. Some lines and chapter endings
            contain apparent transcription errors; use a trusted printed edition for formal
            recitation. The English chapter notes are a reading guide, not a line-by-line
            translation. Sanskrit, Marathi and Hindi household books may differ in wording.
          </div>
          <h2 className="mt-12 font-serif text-3xl">Before everyone gathers</h2>
          <p className="mt-4 leading-8">
            Clean the worship space and arrange a safe lamp, water, flowers, fruit, a simple
            naivedya or sheera, and the Satyanarayan book. Some families use a kalash, banana
            leaves, tulsi, panchamrit or a framed image or murti; follow your family custom and any
            priest’s direction. Keep food covered until offering and arrange seating so the whole
            katha can be heard.
          </p>
          <ol className="mt-8 grid list-none gap-4 p-0 md:grid-cols-2">
            <li className="rounded-2xl bg-white p-5 dark:bg-stone-900">
              <strong>1. Sankalp and Ganapati</strong>
              <p className="mt-2 text-sm leading-7">
                State the intention for the puja and offer a short Ganapati prayer before the main
                worship.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 dark:bg-stone-900">
              <strong>2. Satyanarayan worship</strong>
              <p className="mt-2 text-sm leading-7">
                Offer water, flowers, tulsi where customary, and food. Keep the book at hand.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 dark:bg-stone-900">
              <strong>3. Read all five chapters</strong>
              <p className="mt-2 text-sm leading-7">
                Read the complete katha in sequence. This page helps listeners follow the narrative.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 dark:bg-stone-900">
              <strong>4. Aarti and prasad</strong>
              <p className="mt-2 text-sm leading-7">
                Sing aarti, offer thanks, share prasad with everyone present and eat together.
              </p>
            </li>
          </ol>
          <h2 className="mt-14 font-serif text-3xl">Five-chapter reading companion</h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
            Open each chapter here to read the full community transcription in Devanagari, including
            the source page’s Hindi explanation. These chapters stay available in the offline site.
          </p>
          <ol className="mt-7 list-none space-y-4 p-0">
            {chapters.map((chapter, index) => (
              <li
                key={chapter.number}
                className="rounded-3xl border border-amber-900/15 bg-white p-7 dark:border-amber-100/15 dark:bg-stone-900"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                  अध्याय {chapter.number} · Chapter {chapter.number} of 5
                </p>
                <h3 className="mt-2 font-serif text-2xl">{chapter.title}</h3>
                <p className="mt-3 font-devanagari text-base leading-8 text-stone-800 dark:text-stone-200">
                  <strong>मराठी कथासार:</strong> {chapter.summaryMr}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-stone-300">
                  <strong>English guide:</strong> {chapter.summary}
                </p>
                <details className="mt-5 rounded-2xl bg-amber-50 p-4 dark:bg-stone-800">
                  <summary className="cursor-pointer text-sm font-bold text-amber-900 dark:text-amber-200">
                    Read complete chapter {chapter.number} here
                  </summary>
                  <div className="mt-5 whitespace-pre-wrap break-words border-t border-amber-900/20 pt-5 font-devanagari text-base leading-9 text-stone-800 dark:text-stone-100">
                    {satyanarayanText.chapters[index].text}
                  </div>
                </details>
                <a
                  href={chapter.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-amber-800 underline underline-offset-4 dark:text-amber-300"
                >
                  Compare with Wikisource page ↗
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm leading-7 text-stone-600 dark:text-stone-300">
            Source:{" "}
            <a
              href="https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Skanda Purana, Avanti Khanda, Reva Khanda, chapters 233–237 on Sanskrit Wikisource
            </a>
            . The local transcription is reused under{" "}
            <a
              href={satyanarayanText.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {satyanarayanText.license}
            </a>
            ; see each chapter’s source page and revision history for contributor attribution. The
            chapter summaries on this page are newly written for this guide.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
