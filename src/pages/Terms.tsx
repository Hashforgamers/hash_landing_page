import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, AlertCircle, FileCheck } from 'lucide-react';

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

const Terms: React.FC = () => {
  const keyPoints = [
    {
      icon: <Scale className="w-6 h-6 text-primary" />,
      title: "Legal Agreement",
      content: "These terms constitute a legally binding agreement between you and Hashforgamers Pvt Ltd."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Your Protection",
      content: "We maintain strict security measures and protocols to protect your interests and data."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-primary" />,
      title: "Your Responsibilities",
      content: "Users must provide accurate information and comply with our platform usage guidelines."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-primary" />,
      title: "Service Terms",
      content: "Clear guidelines on service usage, payments, and dispute resolution procedures."
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
            Terms & Conditions
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Please read these terms carefully before using our services
          </motion.p>
        </motion.div>

        {/* Key Points Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gray-800 flex items-center justify-center">
                  {point.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{point.title}</h2>
              </div>
              <p className="text-gray-300">{point.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Terms */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">1. Platform Usage</h3>
                <p className="text-gray-300">
                  The Platform is owned by Hashforgamers Pvt Ltd, a company incorporated under the Companies Act, 1956 with its registered office at A-104 Asmita Garden -1 Poonam Sagar Mira Road Mumbai, Mumbai, India.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">2. User Obligations</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the platform in compliance with applicable laws</li>
                  <li>Pay all charges associated with service usage</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">3. Service Terms</h3>
                <p className="text-gray-300">
                  Your use of our Services and the Platform is solely at your own risk and discretion. We reserve the right to modify, suspend, or terminate services at any time without prior notice.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h3>
                <p className="text-gray-300">
                  All content on the Platform is proprietary to us and is protected by intellectual property laws. Users may not copy, modify, or distribute content without explicit permission.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">5. Liability</h3>
                <p className="text-gray-300">
                  We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of our services.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">6. Governing Law</h3>
                <p className="text-gray-300">
                  These Terms are governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai and Maharashtra.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <h4 className="text-xl font-bold text-white mb-3">Important Notice</h4>
              <p className="text-gray-300">
                By accessing or using our platform, you agree to be bound by these terms and conditions. If you disagree with any part of these terms, you may not access the service.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Terms;