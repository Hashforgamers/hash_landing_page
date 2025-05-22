import React from 'react';
import { motion } from 'framer-motion';

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

const features = [
  {
    title: "Instant Booking",
    description: "Skip the hassle—no need for calls or coordination. Reserve your station instantly and stay focused on what matters."
  },
  {
    title: "Live Availability",
    description: "Check real-time status of spaces nearby. Avoid wait times and plan your sessions with confidence."
  },
  {
    title: "Partner Dashboard",
    description: "Enable seamless management of bookings, slots, and schedules. Designed to streamline operations and empower hosts."
  },
  {
    title: "Built to Scale",
    description: "Whether starting small or expanding locations, our platform adapts to your growth and simplifies your operations."
  }
];

const About: React.FC = () => {
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
            Why Choose Us?
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Rethinking how digital hubs and entertainment zones operate.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]"
        >
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <div className="space-y-6 text-gray-300">
              <p>
                We're here to redefine how people engage with high-end recreational and tech-enabled spaces. 
                With simplified access, our goal is to eliminate barriers and provide users with reliable tools 
                for seamless experiences.
              </p>
              <p>
                The platform is crafted to align users and space owners through intelligent scheduling, 
                transparent operations, and real-time interaction. Whether you're managing one location or many, 
                our tools make it easier to focus on what you do best.
              </p>
              <p>
                For individuals, we offer a clear path to discover, book, and enjoy top-tier setups. 
                For partners, we deliver robust systems to grow and manage their business digitally.
              </p>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "1+", label: "Partner Locations" },
                { number: "10+", label: "Verified Users" },
                { number: "99.9%", label: "System Uptime" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20"
                >
                  <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">
                    {stat.number}
                  </h3>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
