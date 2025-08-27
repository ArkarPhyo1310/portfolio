import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm as useFormspree } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
// Using CSS transitions instead of motion for inputs/buttons to reduce runtime animated nodes
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ContactForm = () => {
  const formSchema = z.object({
    username: z.string().min(1, { message: "This field is required" }),
    email: z
      .email({ message: "Invalid email address" })
      .min(1, { message: "This field is required" }),
    subject: z.string().min(1, { message: "This field is required" }),
    message: z.string().min(1, { message: "This field is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formspreeState, handleSubmitFormspree] = useFormspree("xkgvnwzg");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await handleSubmitFormspree(data);

      if (
        formspreeState.errors &&
        Object.keys(formspreeState.errors).length > 0
      ) {
        toast.error("Failed to send. Please try again.");
        return;
      }

      toast.success(
        "Message sent successfully! Thank you! I will get back to you shortly"
      );
      form.reset();
    } catch (err) {
      console.error("Failed to send message", err);
      toast.error("Failed to send message. Please try again later.");
    }
    setIsSubmitting(false);
  };

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-6"
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="form-group">
                <div className="form-group">
                  <FormLabel className="block mb-2 text-md" htmlFor="name">
                    Name *
                  </FormLabel>
                  <FormControl>
                    <input
                      key="text"
                      placeholder="Your name"
                      type="text"
                      id="username"
                      className="theme-reset w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-transform duration-200 focus:scale-[1.02]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-group">
                <div className="form-group">
                  <FormLabel className="block mb-2 text-md">Email *</FormLabel>

                  <FormControl>
                    <input
                      key="email"
                      placeholder="your.email@example.com"
                      type="email"
                      id="email"
                      className="theme-reset w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-transform duration-200 focus:scale-[1.02]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="form-group">
                <div className="form-group">
                  <FormLabel className="block mb-2 text-md">
                    Subject *
                  </FormLabel>

                  <FormControl>
                    <input
                      key="subject"
                      placeholder="What's this about?"
                      type="text"
                      id="subject"
                      className="theme-reset w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-transform duration-200 focus:scale-[1.02]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="form-group">
                <div className="form-group">
                  <FormLabel className="block mb-2 text-md">
                    Message *
                  </FormLabel>
                  <FormControl>
                    <textarea
                      key="message"
                      id="message"
                      placeholder="Tell me about your project..."
                      className="theme-reset w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-transform duration-200 focus:scale-[1.02]"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <button
            key="submit"
            id="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-transform duration-200 transform-gpu flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin inline-block" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
