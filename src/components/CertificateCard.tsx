import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Certificate } from "@/types/certificate";
import { Calendar, CheckCircle, ExternalLink } from "lucide-react";

const CertificateCard = ({ cert }: { cert: Certificate }) => {
  const { ref } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="bg-background rounded-lg overflow-hidden shadow-sm border border-border group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
    >
      <div className={`bg-gradient-to-r ${cert.color} p-1`}>
        <div className="bg-background rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={cert.logo}
                alt={cert.title}
                className="w-16 h-auto rounded-lg object-contain transition-transform duration-300 hover:scale-110 hover:rotate-2"
              />
              <div>
                <h4 className="text-lg mb-1">{cert.title}</h4>
                <p className="text-muted-foreground">{cert.issuer}</p>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {cert.level}
                </span>
              </div>
            </div>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors transform-gpu hover:scale-110"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {cert.description}
          </p>
          <div className="mb-4">
            <h5 className="text-sm mb-2">Skills Validated</h5>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs transition-transform duration-200 hover:scale-105"
                  aria-hidden={false}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Issued: {cert.issueDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Expires: {cert.expireDate}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            ID: {cert.credentialId}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
