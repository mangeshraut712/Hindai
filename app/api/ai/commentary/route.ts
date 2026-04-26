import { NextRequest, NextResponse } from "next/server";
import { getAcharyaProfile, getAllAcharyas } from "@/lib/ai/commentary/acharyas";
import { CommentaryRequest, AcharyaPerspective } from "@/lib/ai/commentary/types";

export async function POST(request: NextRequest) {
  try {
    const body: CommentaryRequest = await request.json();
    const { verse, scripture, perspective, question } = body;

    if (!verse || !scripture) {
      return NextResponse.json({ error: "Verse and scripture are required" }, { status: 400 });
    }

    const acharyaProfile = getAcharyaProfile(perspective || "general");
    const commentary = generateCommentary(verse, scripture, perspective || "general", question);

    return NextResponse.json({
      perspective: perspective || "general",
      acharyaName: acharyaProfile.name,
      school: acharyaProfile.school,
      commentary: commentary.text,
      keyPoints: commentary.keyPoints,
      relatedConcepts: commentary.relatedConcepts,
      sources: acharyaProfile.famousWorks,
    });
  } catch (error) {
    console.error("Commentary API error:", error);
    return NextResponse.json({ error: "Failed to generate commentary" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const acharyas = getAllAcharyas();
    return NextResponse.json({ acharyas });
  } catch (error) {
    console.error("Commentary API error:", error);
    return NextResponse.json({ error: "Failed to fetch acharyas" }, { status: 500 });
  }
}

function generateCommentary(
  verse: string,
  scripture: string,
  perspective: AcharyaPerspective,
  question?: string
): { text: string; keyPoints: string[]; relatedConcepts: string[] } {
  const profiles = {
    shankara: {
      text: `From the Advaita perspective of Adi Shankaracharya: This verse illustrates the non-dual nature of reality. The apparent multiplicity is Maya (illusion), and the true essence is Brahman alone. The verse points to the identity of Jiva (individual soul) with Brahman (Supreme Reality). Through knowledge (Jnana), one realizes this identity and attains liberation (Moksha).`,
      keyPoints: [
        "Non-dual reality (Advaita)",
        "Maya as illusion",
        "Jiva-Brahman identity",
        "Knowledge as the path",
        "Liberation through realization",
      ],
      relatedConcepts: ["Brahman", "Maya", "Jiva", "Moksha", "Jnana", "Neti-Neti"],
    },
    ramanuja: {
      text: `From the Vishishtadvaita perspective of Ramanujacharya: This verse reveals the qualified non-dual nature of Brahman. The Supreme Reality (Vishnu) with infinite qualities is the foundation of all existence. The individual soul (Jiva) is a real mode of Brahman, distinct yet dependent. The verse emphasizes loving devotion (Bhakti) as the primary means to attain liberation through complete surrender (Prapatti).`,
      keyPoints: [
        "Qualified non-dualism",
        "Saguna Brahman with qualities",
        "Jiva as mode of Brahman",
        "Devotion as primary path",
        "Surrender to Vishnu",
      ],
      relatedConcepts: ["Vishnu", "Bhakti", "Prapatti", "Jiva", "Brahman", "Grace"],
    },
    madhva: {
      text: `From the Dvaita perspective of Madhvacharya: This verse establishes the eternal distinction between the Supreme Lord (Vishnu) and individual souls. Vishnu is the independent, Supreme Reality, while Jivas are His eternal servants. The verse highlights the importance of loving devotion (Bhakti) and service to attain liberation in Vaikuntha, the eternal abode of Vishnu.`,
      keyPoints: [
        "Eternal dualism",
        "Vishnu as Supreme Lord",
        "Jivas as servants",
        "Devotion and service",
        "Liberation in Vaikuntha",
      ],
      relatedConcepts: ["Vishnu", "Dvaita", "Bhakti", "Vaikuntha", "Service", "Grace"],
    },
    vallabha: {
      text: `From the Shuddhadvaita perspective of Vallabhacharya: This verse expresses the pure non-dual nature of Krishna as the Supreme Reality. The world is His divine play (Lila), and individual souls are parts of His being. The verse emphasizes loving devotion (Pushti Bhakti) and divine grace (Prasad) as the means to attain liberation through intimate relationship with Krishna.`,
      keyPoints: [
        "Pure non-dualism",
        "Krishna as Supreme Reality",
        "World as divine play",
        "Jiva as part of Krishna",
        "Divine grace and devotion",
      ],
      relatedConcepts: ["Krishna", "Pushti Bhakti", "Lila", "Grace", "Prasad", "Love"],
    },
    nimbarka: {
      text: `From the Dvaitadvaita perspective of Nimbarkacharya: This verse illustrates the simultaneous identity and difference (Bhedabheda) between Brahman and Jiva. Radha-Krishna are the Supreme Divine Couple, eternally united yet distinct. The verse guides us toward devotion combined with knowledge to realize this mysterious relationship.`,
      keyPoints: [
        "Simultaneous identity and difference",
        "Radha-Krishna as Divine Couple",
        "Bhedabheda philosophy",
        "Devotion with knowledge",
        "Mysterious relationship",
      ],
      relatedConcepts: ["Radha-Krishna", "Bhedabheda", "Devotion", "Knowledge", "Unity"],
    },
    chaitanya: {
      text: `From the Achintya Bhedabheda perspective of Chaitanya Mahaprabhu: This verse reveals the inconceivable difference and non-difference between the soul and Krishna. Radha and Krishna are one in two divine forms. The verse emphasizes congregational chanting (Sankirtana) of the Hare Krishna Maha Mantra as the primary practice to attain divine love (Prema).`,
      keyPoints: [
        "Inconceivable difference-non-difference",
        "Radha-Krishna unity",
        "Sankirtana (chanting)",
        "Divine love (Prema)",
        "Hare Krishna Maha Mantra",
      ],
      relatedConcepts: ["Radha-Krishna", "Sankirtana", "Prema", "Mantra", "Love", "Chanting"],
    },
    general: {
      text: `This verse from ${scripture} offers profound spiritual wisdom. It speaks to the eternal truths of Vedanta philosophy, guiding seekers toward liberation (Moksha). The verse can be understood through multiple paths - knowledge (Jnana), devotion (Bhakti), action (Karma), or meditation (Yoga), depending on one's temperament and spiritual maturity.`,
      keyPoints: [
        "Spiritual wisdom",
        "Liberation as goal",
        "Multiple paths available",
        "Scriptural authority",
        "Practical application",
      ],
      relatedConcepts: ["Moksha", "Jnana", "Bhakti", "Karma", "Yoga", "Scripture"],
    },
  };

  const commentary = profiles[perspective] || profiles.general;

  if (question) {
    commentary.text += `\n\nRegarding your question: "${question}" - ${generateQuestionAnswer(question, perspective)}`;
  }

  return commentary;
}

function generateQuestionAnswer(question: string, perspective: AcharyaPerspective): string {
  const answers: Record<AcharyaPerspective, string> = {
    shankara:
      "From the Advaita view, this question points to the ultimate reality beyond all distinctions. The answer lies in realizing the non-dual nature of existence through self-inquiry (Atma Vichara).",
    ramanuja:
      "From the Vishishtadvaita perspective, this question is answered through loving devotion to Vishnu. The Supreme Lord's grace reveals the truth to the surrendered devotee.",
    madhva:
      "According to Dvaita philosophy, this question is resolved by understanding the eternal distinction between the Lord and the soul. Service to Vishnu brings clarity.",
    vallabha:
      "In Shuddhadvaita, this question finds its answer in the intimate relationship with Krishna. Divine love (Prema) reveals the truth.",
    nimbarka:
      "The Dvaitadvaita approach sees this question through the lens of simultaneous identity and difference. Radha-Krishna's mysterious relationship holds the answer.",
    chaitanya:
      "From the Achintya Bhedabheda view, this question is answered through congregational chanting and divine love. The inconceivable nature of Krishna's pastimes reveals the truth.",
    general:
      "This question can be approached from multiple Vedantic perspectives. The answer depends on one's spiritual inclination and the path one follows - whether knowledge, devotion, action, or meditation.",
  };

  return answers[perspective] || answers.general;
}
