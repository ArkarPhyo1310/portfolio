import type { LanguageProps } from "@/types/default";

export const languages: LanguageProps[] = [
  {
    language: "Japanese",
    flag: "🇯🇵",
    level: "N3",
    certificate: "NAT-TEST Language Certificate",
    issuer: "NAT-TEST",
    score: 136,
    totalScore: 180,
    date: "2025",
    credentialId: "25080058430038",
    filePath: "/certificates/jp.pdf",
    description:
      "Pre-intermediate proficiency in Japanese with ability to understand everyday situations, follow conversations on familiar topics, and read moderately complex texts.",
    skills: [
      "Intermediate Vocabulary",
      "Conversation on Daily & Work Topics",
      "Grammar (Intermediate Patterns)",
      "Listening to Everyday & Workplace Dialogues",
    ],
    color: "from-red-500 to-pink-500",
    achievements: [
      "Able to participate in conversations on daily life and some professional topics",
      "Can understand and use a wider range of kanji (approx. 600-700)",
      "Able to read and comprehend short essays, articles, and workplace documents",
      "Demonstrated readiness for part-time work or study in Japan",
    ],
  },
  {
    language: "English",
    flag: "🇺🇸",
    level: "TOEIC",
    certificate: "TOEIC Certificate",
    issuer: "ETS",
    score: 915,
    totalScore: 990,
    date: "2025",
    credentialId: "00000000000000044578",
    filePath: "/certificates/en.pdf",
    description:
      "Advanced English proficiency with strong ability to understand workplace communication, read technical documents, and follow extended conversations in professional settings.",
    skills: [
      "Listening Comprehension",
      "Reading Comprehension",
      "Business Communication",
      "Workplace English",
      "Technical Documentation",
    ],
    color: "from-blue-500 to-indigo-500",
    achievements: [
      "Able to participate effectively in professional meetings and discussions",
      "Can comprehend business correspondence, reports, and technical documentation",
      "High-level listening comprehension of extended conversations and presentations",
      "Recognized as advanced proficiency for international business communication",
    ],
  },
];

export const getProficiencyLevel = (score: number) => {
  if (score >= 90)
    return { label: "Native/Bilingual", color: "text-green-600" };
  if (score >= 80) return { label: "Advanced", color: "text-blue-600" };
  if (score >= 70)
    return { label: "Upper Intermediate", color: "text-yellow-600" };
  if (score >= 60) return { label: "Immediate", color: "text-orange-600" };
  return { label: "Elementary", color: "text-red-600" };
};

export const langPoints = [
  {
    icon: "🌐",
    title: "Global Communication",
    description: "Cross-cultural technical collaboration",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: "📚",
    title: "Continuous Learning",
    description: "Ongoing skill development and practice",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: "🤝",
    title: "Cultural Bridge",
    description: "Facilitating international partnerships",
    color: "from-orange-500 to-red-500",
  },
];
