export async function synthesizePothiSpeech(input: {
  text: string;
  language: "mr-IN" | "hi-IN" | "en-IN";
  speaker: "ritu" | "shubh";
  apiKey: string;
}): Promise<{ mime: string; base64: string; engine: "sarvam-bulbul-v3" }> {
  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": input.apiKey,
    },
    body: JSON.stringify({
      text: input.text.slice(0, 2400),
      language_code: input.language,
      model: "bulbul:v3",
      speaker: input.speaker,
      pace: 0.82,
      output_audio_codec: "mp3",
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Sarvam TTS ${response.status}: ${detail.slice(0, 240)}`);
  }

  const payload = (await response.json()) as { audios?: string[] };
  const base64 = payload.audios?.[0];
  if (!base64) {
    throw new Error("Sarvam TTS returned no audio.");
  }
  return { mime: "audio/mpeg", base64, engine: "sarvam-bulbul-v3" };
}
