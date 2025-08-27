export interface Certificate {
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
