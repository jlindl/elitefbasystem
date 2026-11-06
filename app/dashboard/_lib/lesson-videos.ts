/*
 * Lesson videos. A lesson with an entry here shows its video at the top of the lesson, with
 * clickable chapters; a lesson without one starts with its overview instead. Nothing else
 * needs changing to add a video.
 *
 * Adding a video:
 *  1. Upload the .mp4 somewhere public (a Supabase Storage bucket or Vercel Blob works well),
 *     or as an unlisted YouTube or Vimeo video, and copy its link.
 *  2. Add an entry below, keyed by "<module number>/<lesson id>" (the list is at the bottom).
 *  3. Optional but recommended:
 *     - captions: a .vtt file. Members watching on mute or who are deaf or hard of hearing rely on it.
 *       (YouTube and Vimeo use the captions you add on their site instead.)
 *     - chapters: the start time and a short name for each section of the video.
 *     - poster: an image shown before the video plays.
 *
 * Example:
 *   "1/basics": {
 *     src: "https://<project>.supabase.co/storage/v1/object/public/lesson-videos/m1-l1.mp4",
 *     captions: "https://<project>.supabase.co/storage/v1/object/public/lesson-videos/m1-l1.vtt",
 *     chapters: [
 *       ["0:00", "Welcome"],
 *       ["0:17", "Strip away the jargon"],
 *       ["0:41", "What FBA means"],
 *       ["0:57", "Split the work"],
 *       ["1:35", "Run it from anywhere"],
 *       ["1:51", "FBM vs FBA"],
 *       ["2:39", "How FBA works"],
 *       ["3:05", "The Prime badge"],
 *       ["3:23", "What the badge unlocks"],
 *       ["3:57", "How you make money"],
 *       ["4:39", "Our framework"],
 *       ["5:01", "The three steps"],
 *       ["5:47", "Up next"],
 *     ],
 *   },
 */

export type LessonVideo = {
  /** A direct .mp4/.webm link, or a YouTube or Vimeo link. */
  src: string;
  /** WebVTT captions for a direct video file. */
  captions?: string;
  /** Image shown before playback starts (direct video files only). */
  poster?: string;
  /** [start time as "m:ss", chapter name], in order. */
  chapters?: [string, string][];
};

export const LESSON_VIDEOS: Record<string, LessonVideo> = {};

export function lessonVideo(moduleNumber: number, lessonId: string): LessonVideo | null {
  return LESSON_VIDEOS[`${moduleNumber}/${lessonId}`] ?? null;
}

export type VideoSource =
  | { kind: "file"; src: string }
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string; hash: string | null };

export function videoSource(src: string): VideoSource {
  const yt = src.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
  if (yt) return { kind: "youtube", id: yt[1] };
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-f]+))?/);
  if (vimeo) {
    let hash: string | null = vimeo[2] ?? null;
    try {
      hash ??= new URL(src).searchParams.get("h");
    } catch {}
    return { kind: "vimeo", id: vimeo[1], hash };
  }
  return { kind: "file", src };
}

/** "1:05" or "1:02:03" -> seconds. */
export function toSeconds(time: string): number {
  return time
    .split(":")
    .map(Number)
    .reduce((total, n) => total * 60 + (Number.isFinite(n) ? n : 0), 0);
}

/** 65 -> "1:05". */
export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/*
 * Lesson ids, for the keys above:
 *   "1/basics"           Lesson 1: The Basics of Amazon FBA
 *   "1/infrastructure"   Lesson 2: How the Infrastructure Works
 *   "1/prime"            Lesson 3: The Prime Badge
 *   "1/fees"             Lesson 4: Storage & Fees
 *   "1/case_study"       Lesson 5: Case Study: Our Blueprint
 *   "1/unit_economics"   Lesson 6: Unit Economics
 *   "2/preflight"        Lesson 1: Before You Begin
 *   "2/plans"            Lesson 2: Choosing Your Selling Plan
 *   "2/registration"     Lesson 3: Walking Through the Wizard
 *   "2/approval"         Lesson 4: Verification & Approval
 *   "2/tour"             Lesson 5: Seller Central Tour
 *   "2/hygiene"          Lesson 6: Day-One Account Hygiene
 *   "3/mindset"          Lesson 1: The Research Mindset
 *   "3/hunting"          Lesson 2: Sourcing Hunting Grounds
 *   "3/validation"       Lesson 3: The Amazon Validation Method
 *   "3/helium"           Lesson 4: Helium 10 X-Ray
 *   "3/bundles"          Lesson 5: The Bundle Opportunity Test
 *   "3/wholesale"        Lesson 6: Approaching Wholesale Suppliers
 *   "4/foundations"      Lesson 1: Anatomy of a Listing
 *   "4/gtin"             Lesson 2: Generic Brand & GTIN Exemption
 *   "4/copywriting"      Lesson 3: Writing the Listing Copy
 *   "4/html"             Lesson 4: HTML Description Formatting
 *   "4/images"           Lesson 5: Listing Images
 *   "4/form"             Lesson 6: Completing the Form & Going Live
 *   "5/prep"             Lesson 1: Preparing Your Bundle
 *   "5/polybag"          Lesson 2: Polybagging Your Units
 *   "5/box"              Lesson 3: Packing the Outer Box
 *   "5/shipment"         Lesson 4: Creating the Shipment
 *   "5/labels"           Lesson 5: Printing Your Labels
 *   "5/shipping"         Lesson 6: Shipping & Arrival
 */
