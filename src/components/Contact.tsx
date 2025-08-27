import { contactInfo, socialLinks } from "@/data/contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 bg-accent/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl md:text-4xl mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`bg-background rounded-lg p-8 shadow-sm transition-all duration-600 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <h3 className="text-2xl mb-6">Send me a message</h3>

            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3
                className={`text-2xl mb-6 transition-all duration-600 delay-150 ${
                  isInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
              >
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    className={`theme-reset flex items-center shadow-md space-x-4 p-4 bg-background rounded-lg hover:bg-accent/50 transition-all duration-300 cursor-pointer group ${
                      isInView
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-6"
                    } hover:-translate-1`}
                  >
                    <div className="p-3 bg-primary/10 text-primary rounded-lg transition-transform duration-300 transform-gpu hover:scale-110 hover:rotate-2">
                      {React.createElement(info.icon, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h4 className="mb-1">{info.title}</h4>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4
                className={`text-lg mb-4 transition-all duration-600 delay-300 ${
                  isInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
              >
                Follow me
              </h4>
              <div
                className={`flex space-x-4 transition-all duration-600 delay-300 ${
                  isInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-reset p-3 bg-background border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-6"
                    title={social.name}
                  >
                    {React.createElement(social.icon, { className: "w-6 h-6" })}
                  </a>
                ))}
              </div>
            </div>

            <div
              className={`bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-600 delay-400 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              } hover:-translate-y-1.5`}
            >
              <h4 className="text-lg mb-4">Let's work together</h4>
              <p className="text-muted-foreground leading-relaxed">
                I'm currently available for freelance work and interesting
                projects. Whether you have a question or just want to say hi,
                I'll try my best to get back to you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
