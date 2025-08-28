export interface CertificateProps {
  title: string;
  issuer: string;
  issueDate: string;
  expireDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  logo?: string;
  description?: string;
  skills: string[];
  color?: string;
  level?: string;
}

export interface LanguageProps {
  language: string;
  flag: string;
  level: string;
  certificate: string;
  issuer: string;
  score: number;
  totalScore: number;
  date: string;
  credentialId: string;
  filePath: string;
  description: string;
  skills: string[];
  color: string;
  achievements: string[];
}
