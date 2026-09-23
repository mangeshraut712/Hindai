import assert from "node:assert/strict";
import { test } from "node:test";
import {
  RECITATIONS,
  getRecitation,
  recitationPlainText,
  recitationVerseCount,
} from "./catalog";

function textOf(slug: string): string {
  const item = getRecitation(slug);
  assert.ok(item, slug);
  return recitationPlainText(item);
}

function labelsOf(slug: string): string[] {
  const item = getRecitation(slug);
  assert.ok(item);
  return item.sections.flatMap((section) => section.verses.map((verse) => verse.label));
}

test("nine recitations are complete enough to recite", () => {
  assert.deepEqual(
    RECITATIONS.map((item) => item.slug),
    [
      "hanuman-chalisa",
      "vishnu-sahasranama",
      "kanakadhara-stotram",
      "shiva-shatakam",
      "kalabhairava-ashtakam",
      "ganapati-atharvashirsha",
      "santana-gopala",
      "durga-saptashati",
      "aditya-hridayam",
    ]
  );

  for (const item of RECITATIONS) {
    assert.ok(recitationVerseCount(item) > 0, item.slug);
    for (const section of item.sections) {
      assert.ok(section.verses.length > 0, `${item.slug} ${section.id}`);
      for (const verse of section.verses) {
        assert.ok(verse.original.trim().length > 0);
        assert.ok(verse.iast.trim().length > 0);
      }
    }
  }

  const chalisa = textOf("hanuman-chalisa");
  assert.ok(chalisa.includes("जय हनुमान ज्ञान गुन सागर"));
  assert.ok(chalisa.includes("पवनतनय संकट हरन"));
  assert.ok(labelsOf("hanuman-chalisa").includes("40"));

  const vishnu = textOf("vishnu-sahasranama");
  assert.ok(vishnu.includes("विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः"));
  assert.ok(vishnu.includes("सर्वप्रहरणायुधः"));
  assert.ok(labelsOf("vishnu-sahasranama").includes("१०७"));

  const kanaka = textOf("kanakadhara-stotram");
  assert.ok(kanaka.includes("माङ्गल्यदा"));
  assert.ok(kanaka.includes("भवन्ति ते भुवि बुधभाविताशयाः"));
  assert.equal(kanaka.includes("अयं स्तवः"), false);
  assert.ok(labelsOf("kanakadhara-stotram").includes("१८"));
  assert.ok(labelsOf("kanakadhara-stotram").includes("२५"));

  assert.ok(labelsOf("shiva-shatakam").includes("१००"));
  assert.ok(textOf("shiva-shatakam").includes("शिवं गौरीश्लिष्टं"));

  assert.ok(labelsOf("kalabhairava-ashtakam").includes("८"));
  assert.ok(textOf("kalabhairava-ashtakam").includes("काशिकापुराधिनाथकालभैरव"));

  const atharva = textOf("ganapati-atharvashirsha");
  assert.ok(atharva.includes("ॐ नमस्ते गणपतये"));
  assert.ok(atharva.includes("इत्युपनिषत्"));
  assert.ok(atharva.includes("ॐ सह नाववतु"));

  const santana = textOf("santana-gopala");
  assert.ok(santana.includes("देवकीसुत गोविन्द वासुदेव जगत्पते"));
  assert.ok(santana.includes("देहि मे तनयं कृष्ण"));
  assert.ok(labelsOf("santana-gopala").includes("१००"));

  const durga = getRecitation("durga-saptashati");
  assert.ok(durga);
  const durgaTitles = durga.sections.map((section) => section.titleEn);
  assert.ok(durgaTitles.includes("Argala stotram"));
  assert.ok(durgaTitles.includes("Kilaka stotram"));
  assert.ok(durgaTitles.includes("Devi kavacham"));
  assert.ok(durgaTitles.includes("Adhyaya 1 · Madhu and Kaitabha"));
  assert.ok(durgaTitles.includes("Adhyaya 13 · Boons to Suratha and the merchant"));
  assert.ok(labelsOf("durga-saptashati").includes("१.१"));
  assert.ok(textOf("durga-saptashati").includes("सावर्णि"));

  assert.ok(labelsOf("aditya-hridayam").includes("३१"));
  assert.ok(textOf("aditya-hridayam").includes("आदित्यहृदयं पुण्यं"));
});
