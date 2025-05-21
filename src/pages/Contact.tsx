import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import { ShieldCheck, Mail, Headphones, Phone, MapPin } from 'lucide-react';

const contactFeatures = [
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    title: "24/7 Support",
    description: "Our team is available around the clock to assist with any questions or issues."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Secure Communication",
    description: "Your messages are encrypted and handled with the utmost confidentiality."
  },
  {
    icon: <Headphones className="w-6 h-6 text-primary" />,
    title: "Fast Response",
    description: "We pride ourselves on quick response times to all inquiries."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

const Contact: React.FC = () => {
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Have questions about our gaming stations? Need help with booking? 
            Our team of battle-hardened support warriors are ready to assist you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="order-2 lg:order-1"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Features */}
          <motion.div 
            variants={containerVariants}
            className="order-1 lg:order-2"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Why Reach Out?</h3>
              
              <div className="space-y-8">
                {contactFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-lg bg-gray-800 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Emergency Support */}
              <motion.div 
                variants={itemVariants}
                className="mt-10 p-6 rounded-xl bg-primary/10 border border-primary/20"
              >
                <h4 className="text-xl font-bold text-white mb-3">Emergency Support</h4>
                <p className="text-gray-300 mb-4">
                  Technical issues during gameplay? Our rapid response team is available 24/7.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Headphones className="w-5 h-5" />
                    <span>support@hashforgamers.co.in / hashforgamers@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Phone className="w-5 h-5" />
                    <span>+91 9137757935</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <MapPin className="w-5 h-5" />
                    <span>Asmita Garden, Mira Road, Mumbai</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
