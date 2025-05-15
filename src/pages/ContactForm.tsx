import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../components/supabaseClient";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const templateParams = {
      title: "Thank you for contacting Hash For Gamers!",
      from_name: formData.fullName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const { error } = await supabase.from("contact_messages").insert([
              {
                full_name: formData.fullName,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
              },
            ]);
      if (error) {
        setError("Failed to submit your message. Please try again.");
        console.error("Supabase insert error:", error);
      } else {
        const result = await emailjs.send(
          "service_oqp55sh",    // from EmailJS dashboard
          "template_t8bfzai",   // from EmailJS dashboard
          templateParams,
          "oDRkZOrqmtQ1TpZHE"        // from EmailJS dashboard
        );
        setSuccess(true);
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
    >
      <motion.h3 
        variants={itemVariants} 
        className="text-2xl font-bold text-white mb-6"
      >
        Send Us a Message
      </motion.h3>

      <motion.form 
        variants={formVariants}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
            Name <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-gray-900/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-500 transition-all"
              placeholder="Your full name"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-primary/0 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(255,0,0,0.3)]" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-900/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-500 transition-all"
              placeholder="you@example.com"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-primary/0 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(255,0,0,0.3)]" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-gray-900/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-500 transition-all"
              placeholder="Subject of your message"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-primary/0 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(255,0,0,0.3)]" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-900/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-500 transition-all resize-none"
              placeholder="Write your message here..."
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-primary/0 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(255,0,0,0.3)]" />
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-red-900/30 text-red-300 p-3 rounded-lg border border-red-500/30"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-green-900/30 text-green-300 p-3 rounded-lg border border-green-500/30"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p>Message sent successfully! We'll get back to you soon.</p>
          </motion.div>
        )}

        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={loading}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 0 20px rgba(255,0,0,0.4)'
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold px-6 py-4 rounded-lg text-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5 ml-1" />
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;