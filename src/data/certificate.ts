import type { CertificateProps } from "@/types/default";

export const certifications: CertificateProps[] = [
  {
    title: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    issueDate: "2023",
    expireDate: "2026",
    credentialId: "0VCDDGTC8N14Q238",
    verifyUrl: "https://aws.amazon.com/verification",
    logo: "/awsml.png",
    description:
      "Demonstrated expertise in architecting ML/deep learning workloads, optimizing model training, and implementing production-ready ML systems.",
    skills: [
      "Amazon Web Services",
      "Sagemaker",
      "Data Engineering",
      "Machine Learning",
      "Model Evaluation And Validation",
    ],
    color: "from-orange-500 to-yellow-500",
    level: "Professional",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2023",
    expireDate: "2026",
    credentialId: "2S0D5VVK91BQ1Z9N",
    verifyUrl: "https://aws.amazon.com/verification",
    logo: "/awscp.png",
    description:
      "Demonstrated foundational understanding of AWS cloud concepts, services, security, pricing, and architecture best practices.",
    skills: [
      "Cloud Concepts",
      "AWS Core Services (EC2, S3, RDS, Lambda, etc.)",
      "Security & Compliance",
      "AWS Pricing & Billing",
      "Cloud Architecture Fundamentals",
    ],
    color: "from-orange-500 to-yellow-500",
    level: "Beginner / Foundational",
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI & AWS (via Coursera)",
    issueDate: "2024",
    expireDate: "None",
    credentialId: "JTB6D5Q4S2JW",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/JTB6D5Q4S2JW",
    logo: "/awscoursera.png", // placeholder for your logo asset
    description:
      "Completed a hands-on introduction to generative AI and large language models, covering principles, tools, and architecture used in modern applications.",
    skills: [
      "Generative AI",
      "Large Language Models",
      "Prompt Engineering",
      "PyTorch",
      "Reinforcement Learning",
      "Performance Optimization",
      "NLP",
    ],
    color: "from-blue-500 to-purple-600",
    level: "Intermediate",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (via Coursera)",
    issueDate: "2022",
    expireDate: "None",
    credentialId: "KH5U93U6BUQ3",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/KH5U93U6BUQ3",
    logo: "/dl.png",
    description:
      "Completed a comprehensive series of courses covering neural networks, deep learning, CNNs, sequence models, and practical AI projects using modern tools.",
    skills: [
      "Neural Networks",
      "Deep Learning",
      "Convolutional Neural Networks (CNN)",
      "Sequence Models (RNN, LSTM)",
      "Model Optimization & Regularization",
    ],
    color: "from-blue-500 to-purple-600",
    level: "Intermediate/Professional",
  },
];
