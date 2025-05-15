import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const containerVariants = {
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

const Privacy: React.FC = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Introduction",
      content: `This Privacy Policy describes how Hashforgamers Pvt Ltd and its affiliates collect, use, share, protect or otherwise process your information through our website. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India.`
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "Collection",
      content: `We collect your personal data when you use our Platform, services or otherwise interact with us. This includes name, date of birth, address, contact information, and payment details when necessary.`
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "Usage",
      content: `We use personal data to provide services, enhance customer experience, resolve disputes, detect fraud, and improve our offerings. Your data helps us customize your experience and keep you informed about relevant updates.`
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Security",
      content: `We implement robust security measures to protect your personal data from unauthorized access, disclosure, loss or misuse through reasonable security practices and procedures.`
    }
  ];

  return (
    <section className="relative min-h-screen bg-black py-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black z-0" />
      <div className="absolute w-96 h-96 rounded-full blur-[120px] bg-primary/20 -top-10 -left-10 z-0" />
      <div className="absolute w-96 h-96 rounded-full blur-[120px] bg-primary/20 -bottom-10 -right-10 z-0" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Your privacy is our priority. Learn how we protect and manage your data.
          </motion.p>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gray-800 flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-300">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Content */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
        >
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Detailed Information</h2>
            
            {/* Full Privacy Policy Content */}
            <div className="space-y-6 text-gray-300">
              <p>
                By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">Data Collection & Usage</h3>
              <p>
                We collect information that you provide directly to us, including but not limited to personal data during sign-up/registration such as name, date of birth, address, contact information, and payment details when necessary.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">Security Measures</h3>
              <p>
                We implement robust security measures to protect your personal data from unauthorized access, disclosure, loss or misuse through reasonable security practices and procedures.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">Your Rights</h3>
              <p>
                You have the right to access, rectify, and update your personal data. You can manage your information directly through the Platform's functionalities or contact our support team for assistance.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8">Contact Us</h3>
              <p>
                If you have any questions about our Privacy Policy or how we handle your data, please don't hesitate to contact our Data Protection Officer at privacy@hashforgamers.co.in
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Privacy;