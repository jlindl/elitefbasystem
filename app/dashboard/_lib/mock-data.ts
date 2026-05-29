export const progress = {
  modulesCompleted: 4,
  modulesTotal: 9,
  percentComplete: 44,
  currentModule: 4,
  currentLesson: 2,
};

export type UpNextItem = {
  moduleNumber: number;
  lessonNumber: number;
  moduleTitle: string;
  lessonTitle: string;
  durationMinutes: number;
};

export const upNext: UpNextItem[] = [
  {
    moduleNumber: 4,
    lessonNumber: 2,
    moduleTitle: "Listing Creation",
    lessonTitle: "Writing your bullet points",
    durationMinutes: 8,
  },
  {
    moduleNumber: 4,
    lessonNumber: 3,
    moduleTitle: "Listing Creation",
    lessonTitle: "Photography that sells",
    durationMinutes: 12,
  },
  {
    moduleNumber: 4,
    lessonNumber: 4,
    moduleTitle: "Listing Creation",
    lessonTitle: "Pricing for the Buy Box",
    durationMinutes: 6,
  },
];

export const mentorship = {
  nextCall: {
    date: "Thursday, May 8",
    time: "6:00 PM GMT",
    zoomLink: "#",
  },
  lastMessageFromJakub:
    "Sent through your draft listing. Will review by Wed 👍",
  lastMessageTimestamp: "2h ago",
};

export type ToolIcon = "search" | "megaphone" | "library";

export type Tool = {
  id: string;
  name: string;
  description: string;
  icon: ToolIcon;
  statusLine: string;
};

export const tools: Tool[] = [
  {
    id: "product-research",
    name: "Product Research Form",
    description:
      "Log and review every product you're considering. Live database.",
    icon: "search",
    statusLine: "12 PRODUCTS LOGGED · 3 IN REVIEW",
  },
  {
    id: "ppc-setup",
    name: "PPC Set-up Form",
    description: "Plan and track your campaigns before they go live.",
    icon: "megaphone",
    statusLine: "2 CAMPAIGNS · LAST UPDATED 3 DAYS AGO",
  },
  {
    id: "useful-links",
    name: "Useful Links",
    description:
      "Curated tools, suppliers and resources Jakub actually uses.",
    icon: "library",
    statusLine: "27 RESOURCES · UPDATED WEEKLY",
  },
];

export type TeamMomentType = "win" | "question" | "milestone";

export type TeamMoment = {
  type: TeamMomentType;
  name: string;
  initials: string;
  headline: string;
  quote: string;
  timestamp: string;
  replies?: number;
};

export const teamMoments: TeamMoment[] = [
  {
    type: "win",
    name: "Sarah K.",
    initials: "SK",
    headline: "First sale this week 🎉",
    quote: "Sourced bundle, listed Tuesday, sold Friday. Surreal.",
    timestamp: "1d ago",
  },
  {
    type: "question",
    name: "James R.",
    initials: "JR",
    headline: "James R. asked:",
    quote:
      "Has anyone tried sourcing from a B&M wholesaler in the Midlands?",
    timestamp: "2h ago",
    replies: 4,
  },
  {
    type: "milestone",
    name: "Priya M.",
    initials: "PM",
    headline: "Hit £3K week 💪",
    quote: "Three SKUs, all bundles, no PPC yet. Wild.",
    timestamp: "3d ago",
  },
];
