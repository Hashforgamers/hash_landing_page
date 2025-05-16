import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Rocket, Cog, BarChart } from 'lucide-react';

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
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    title: "Instant Booking",
    description: "No waiting. No calling. Just book and play. Get instant access to your favorite gaming stations."
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Real-Time Availability",
    description: "See what's available at your favorite cafés, in real-time. No more guessing or wasted trips."
  },
  {
    icon: <Cog className="w-8 h-8 text-primary" />,
    title: "For Café Partners",
    description: "Powerful backend tools to manage bookings, slots, and capacity efficiently. Take control of your business."
  },
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: "Scalable Platform",
    description: "Built for growth—whether you're a single café or a chain. Our platform grows with your ambitions."
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
            Why Hash?
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Revolutionizing the Gaming Café Experience
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
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gray-800 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{feature.title}</h2>
              </div>
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
                At Hash For Gamers, we're on a mission to transform how gamers access and experience gaming cafés. 
                We believe that every gamer deserves seamless access to high-quality gaming stations without the 
                hassle of traditional booking systems.
              </p>
              <p>
                Our platform bridges the gap between passionate gamers and premium gaming facilities, creating 
                a ecosystem that benefits both players and café owners. We're not just a booking platform; 
                we're building the future of gaming café management.
              </p>
              <p>
                Whether you're a casual gamer looking for a quick session or a professional team needing 
                practice space, Hash For Gamers is your gateway to hassle-free gaming experiences.
              </p>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "1+", label: "Partner Cafés" },
                { number: "10+", label: "Active Users" },
                { number: "99.9%", label: "Uptime" }
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