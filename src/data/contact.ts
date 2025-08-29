import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contactLinks } from "./about";

export const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    url: contactLinks.github,
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: contactLinks.linkedIn,
  },
];

export const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: contactLinks.mail,
    link: `mailto:${contactLinks.mail}`,
  },
  {
    icon: Phone,
    title: "Phone",
    content: contactLinks.phone,
    link: `tel:${contactLinks.phone}`,
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Bangkok, Thailand",
    link: "https://www.google.com/maps/place/Bangkok,+Thailand",
  },
];
