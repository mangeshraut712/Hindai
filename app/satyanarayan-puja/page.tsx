import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SatyanarayanReader } from "@/components/satyanarayan/satyanarayan-reader";
import { SATYANARAYAN_READING_CHAPTERS } from "@/lib/data/satyanarayan-reader";
import satyanarayanText from "@/lib/data/satyanarayan-katha.json";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "श्री सत्यनारायण व्रतकथा | Five chapter reading",
  description:
    "Read the five chapter Satyanarayan katha in Sanskrit with Marathi chapter guides and separate Hindi explanations, available in the offline library.",
  alternates: { canonical: `${SITE_URL}/satyanarayan-puja` },
};

const chapters = [
  {
    number: 1,
    title: "The vow is taught",
    titleMr: "व्रताची शिकवण",
    summary:
      "Narada asks how people facing hardship may find relief. Vishnu describes the Satyanarayan vow: worship with devotion, listen to the katha, offer prasad within one's means and share it. This opening chapter gives the purpose and basic observance of the vow.",
    summaryMr:
      "नारद मुनी लोकांचे दुःख दूर करण्याचा उपाय विचारतात. भगवान विष्णू त्यांना सत्यनारायण व्रत सांगतात: आपल्या ऐपतीप्रमाणे पूजा करावी, कथा ऐकावी आणि प्रसाद सर्वांना वाटावा. या अध्यायात व्रताचा हेतू व साधी पद्धत येते.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३३",
  },
  {
    number: 2,
    title: "The Brahmin and the woodcutter",
    titleMr: "ब्राह्मण आणि लाकूड विकणारा",
    summary:
      "Vishnu, in the form of an elderly Brahmin, teaches a poor Brahmin in Kashi. The man performs the vow with what he receives, and a woodcutter who sees the worship follows his example. He uses his day's earnings for an offering and shares it with his family.",
    summaryMr:
      "काशीतील दरिद्री ब्राह्मणाला भगवान वृद्ध ब्राह्मणाच्या रूपात व्रत सांगतात. मिळालेल्या भिक्षेतून तो पूजा करतो. त्याची पूजा पाहून एका लाकूड विकणाऱ्याला व्रत समजते; तोही दिवसभराच्या कमाईतून नैवेद्य तयार करून कुटुंबासह पूजा करतो.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३४",
  },
  {
    number: 3,
    title: "The merchant's unfulfilled promise",
    titleMr: "व्यापाऱ्याचा राहिलेला संकल्प",
    summary:
      "King Ulkamukha's worship inspires a merchant to promise the vow when he has a child. A daughter is born and married, but he still delays. During a trading journey he and his son-in-law are wrongly imprisoned. His daughter Kalavati hears the katha; his wife Lilavati performs the vow, and the two men are freed.",
    summaryMr:
      "राजा उल्कामुखाची पूजा पाहून साधू नावाचा व्यापारी संतती झाल्यावर व्रत करण्याचा संकल्प करतो. कलावतीचा जन्म व विवाह होतो, तरी तो संकल्प पुढे ढकलतो. व्यापारासाठी गेलेला व्यापारी व जावई चोरीच्या आरोपावरून कैद होतात. कलावती कथा ऐकते, लीलावती व्रत करते आणि दोघांची सुटका होते.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३५",
  },
  {
    number: 4,
    title: "The merchant's return and the prasad",
    titleMr: "व्यापाऱ्याचे परतणे आणि प्रसाद",
    summary:
      "On the return journey the merchant gives a dismissive answer to a disguised ascetic and his cargo seems to vanish. He apologises, performs worship and continues home. Kalavati rushes to greet her husband without taking the prasad; the story turns again when she goes back, receives it and returns.",
    summaryMr:
      "परतीच्या वाटेवर साधू व्यापारी दंडीवेषातील भगवंताला उपेक्षेने उत्तर देतो आणि नौकेतील धन नाहीसे झाल्यासारखे दिसते. चूक मान्य करून तो पूजा करतो. घरी कलावती प्रसाद न घेता पतीला भेटायला धावते; पती अदृश्य झाल्यावर ती परत जाऊन प्रसाद घेते आणि मग त्याची पुन्हा भेट होते.",
    href: "https://sa.wikisource.org/wiki/स्कन्दपुराणम्/खण्डः_५_(अवन्तीखण्डः)/रेवा_खण्डम्/अध्याय:२३६",
  },
  {
    number: 5,
    title: "King Tungadhvaja and the closing praise",
    titleMr: "राजा तुंगध्वज आणि फलश्रुती",
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
        <section className="relative overflow-hidden bg-[#381b15] px-5 py-16 text-amber-50 sm:px-8 sm:py-20">
          <div
            className="pointer-events-none absolute -right-24 -top-48 size-[460px] rounded-full border border-amber-200/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-12 -top-36 size-[360px] rounded-full border border-amber-200/10"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-5xl">
            <Link
              href="/ganeshotsav"
              className="text-sm text-amber-200 underline underline-offset-4"
            >
              ← गणेशोत्सव मार्गदर्शक
            </Link>
            <p className="mt-11 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              घरच्या पूजेसाठी · Five chapter reading
            </p>
            <h1 className="mt-4 max-w-4xl font-devanagari text-5xl font-semibold leading-tight sm:text-6xl">
              श्री सत्यनारायण व्रतकथा
            </h1>
            <p className="mt-5 max-w-3xl font-devanagari text-lg leading-9 text-amber-50/85">
              मूळ संस्कृत पाठ, अध्यायानुसार मराठी कथासार आणि स्वतंत्र हिंदी अर्थ. वाचताना एकावेळी
              एकच अध्याय दिसेल.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#katha-reader"
                className="rounded-full bg-amber-200 px-6 py-3 text-sm font-bold text-amber-950 hover:bg-amber-100"
              >
                कथा वाचायला सुरुवात करा ↓
              </a>
              <a
                href="#puja-guide"
                className="rounded-full border border-amber-200/40 px-6 py-3 text-sm font-semibold text-amber-50 hover:bg-white/10"
              >
                पूजेची तयारी
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
          <div className="mb-12 rounded-2xl border border-amber-800/20 bg-amber-100/65 px-5 py-4 text-sm leading-7 dark:bg-stone-900">
            <strong>पाठाविषयी:</strong> पाचही अध्याय या साइटमध्ये उपलब्ध आहेत. हा संस्कृत
            विकिस्रोतवरील सामूहिक लिप्यंतरित पाठ आहे. त्यात काही ओळींच्या चुका किंवा पाठभेद असू
            शकतात; विधीपूर्वक पठणासाठी विश्वासार्ह छापील आवृत्तीशी पडताळा. मराठी मजकूर हा अध्यायाचा
            सारांश आहे, पूर्ण मराठी अनुवाद नाही.
          </div>

          <SatyanarayanReader chapters={SATYANARAYAN_READING_CHAPTERS} guides={chapters} />

          <section
            id="puja-guide"
            className="mt-20 scroll-mt-20 border-t border-amber-900/15 pt-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
              घरची पूजा · Household guide
            </p>
            <h2 className="mt-3 font-devanagari text-3xl font-semibold sm:text-4xl">
              कथा वाचण्यापूर्वी
            </h2>
            <p className="mt-5 max-w-3xl font-devanagari text-base leading-8 text-stone-700 dark:text-stone-300">
              पूजेची जागा स्वच्छ करा. दिवा, पाणी, फुले, फळे आणि नैवेद्य किंवा शिरा तयार ठेवा. कलश,
              तुळस, पंचामृत यांसारख्या गोष्टी घरच्या परंपरेनुसार वापरा. सगळ्यांना कथा ऐकता येईल अशी
              बसण्याची सोय करा.
            </p>
            <ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
              <li className="rounded-2xl border border-amber-900/10 bg-white p-6 dark:bg-stone-900">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">०१</span>
                <h3 className="mt-2 font-devanagari text-xl font-semibold">
                  संकल्प आणि गणपती पूजन
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  State the intention and offer a short Ganapati prayer.
                </p>
              </li>
              <li className="rounded-2xl border border-amber-900/10 bg-white p-6 dark:bg-stone-900">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">०२</span>
                <h3 className="mt-2 font-devanagari text-xl font-semibold">सत्यनारायण पूजन</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Offer water, flowers, tulsi where customary, and food.
                </p>
              </li>
              <li className="rounded-2xl border border-amber-900/10 bg-white p-6 dark:bg-stone-900">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">०३</span>
                <h3 className="mt-2 font-devanagari text-xl font-semibold">पाचही अध्याय वाचा</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Read the katha in order, allowing everyone to hear it.
                </p>
              </li>
              <li className="rounded-2xl border border-amber-900/10 bg-white p-6 dark:bg-stone-900">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">०४</span>
                <h3 className="mt-2 font-devanagari text-xl font-semibold">आरती आणि प्रसाद</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Conclude with aarti and share the offered food.
                </p>
              </li>
            </ol>
          </section>

          <p className="mt-14 max-w-4xl text-xs leading-6 text-stone-600 dark:text-stone-400">
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
            ; each chapter links to its source page and revision history. Display spacing is
            normalized, while the original source data remains stored unchanged. Marathi and English
            chapter guides were written for this site.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
