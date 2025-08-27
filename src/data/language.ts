export const languages = [
  {
    language: "Japanese",
    flag: "🇯🇵",
    level: "N4 (Elementary)",
    certificate: "NAT-TEST Language Certificate",
    issuer: "NAT-TEST",
    score: "133/180",
    date: "2025",
    credentialId: "25060058440018",
    filePath: "src/assets/25060058440018.pdf",
    proficiency: 40, // % scale (good beginner)
    description:
      "Elementary proficiency in Japanese with ability to handle daily conversations, read simple texts, and understand basic grammar patterns.",
    skills: [
      "Basic Vocabulary",
      "Daily Conversation",
      "Reading Short Texts",
      "Elementary Grammar",
      "Listening Comprehension",
    ],
    color: "from-red-500 to-pink-500",
    achievements: [
      "Able to manage everyday communication in Japanese",
      "Can understand and use basic grammar and kanji (approx. 300-400)",
      "Demonstrated readiness for simple life in Japan (shopping, travel, directions)",
    ],
  },
];

export const getProficiencyLevel = (score: number) => {
  if (score >= 90)
    return { label: "Native/Bilingual", color: "text-green-600" };
  if (score >= 80) return { label: "Advanced", color: "text-blue-600" };
  if (score >= 70)
    return { label: "Upper Intermediate", color: "text-yellow-600" };
  if (score >= 60) return { label: "Intermediate", color: "text-orange-600" };
  return { label: "Elementary", color: "text-red-600" };
};
