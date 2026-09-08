import type { ChapterId } from "./catalog";

const loaders: Record<ChapterId, () => Promise<{ default: string[] }>> = {
  1: () => import("./chapters/01.json"),
  2: () => import("./chapters/02.json"),
  3: () => import("./chapters/03.json"),
  4: () => import("./chapters/04.json"),
  5: () => import("./chapters/05.json"),
  6: () => import("./chapters/06.json"),
  7: () => import("./chapters/07.json"),
  8: () => import("./chapters/08.json"),
  9: () => import("./chapters/09.json"),
  10: () => import("./chapters/10.json"),
  11: () => import("./chapters/11.json"),
  12: () => import("./chapters/12.json"),
  13: () => import("./chapters/13.json"),
  14: () => import("./chapters/14.json"),
  15: () => import("./chapters/15.json"),
};

export async function loadChapterOvis(id: ChapterId): Promise<string[]> {
  const mod = await loaders[id]();
  return mod.default;
}
