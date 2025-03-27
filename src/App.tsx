import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, GamepadIcon, Clock, Trophy, Sparkles, Gamepad2, MonitorPlay, Users2, Download, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import LocationOverlay from './components/LocationOverlay';
import PreRegistrationForm from './components/PreRegistrationForm';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };


  const imageVariants = {
    hover: {
      scale: 1.05,
      borderColor: "#00FF00",
      boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
    }
  };

  const gamingImages = [
    {
      url: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80",
      title: "RGB Setup"
    },
    {
      url: "https://images.unsplash.com/photo-1603481546239-65e13c5f0f38?auto=format&fit=crop&q=80",
      title: "Gaming Gear"
    },
    {
      url: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&q=80",
      title: "Pro Gaming"
    },
    {
      url: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80",
      title: "Esports"
    }
  ];


  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00FF00] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <GamepadIcon className="w-8 h-8 text-[#00FF00]" />
            <span className="text-xl font-bold">Hash</span>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {/* <motion.a
              whileHover={{ scale: 1.1, color: "#00FF00" }}
              href="#consoles"
              className="transition-colors"
            >
              Consoles
            </motion.a>
             */}
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00FF00] text-black font-bold px-6 py-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            >
              Pre Register Cafe
            </motion.button> */}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover opacity-50"
            style={{ filter: 'brightness(0.4)' }}
          >
            <source src="/videos/coverr-man-and-woman-playing-video-games-3055-1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <motion.div
          style={{ opacity, scale }}
          className="container mx-auto px-6 relative z-20"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 mb-4"
            >
              <span className="bg-[#00FF00] text-black px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                Live Soon
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-7xl font-bold mb-6 leading-tight"
            >
              Level Up Your{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-[#00FF00] inline-block"
              >
                Gaming
              </motion.span>{" "}
              Experience
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-2xl"
            >
              Book premium gaming consoles by the hour. Experience next-gen gaming with 
              our high-end setups, competitive tournaments, and vibrant community.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPreRegisterOpen(true)}
                className="bg-[#00FF00] text-black font-bold px-6 py-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                Pre Register
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#00FF00" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLocationOverlayOpen(true)}
                className="border border-[#00FF00]/20 px-8 py-4 rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,255,0,0.15)] backdrop-blur-sm"
              >
                View Locations
              </motion.button>

              <PreRegistrationForm
                isOpen={isPreRegisterOpen}
                onClose={() => setIsPreRegisterOpen(false)}
              />

              <LocationOverlay
                isOpen={isLocationOverlayOpen}
                onClose={() => setIsLocationOverlayOpen(false)}
              />
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="mt-12 grid grid-cols-3 gap-8 max-w-2xl"
            >
              {[
                { number: "20+", label: "Gaming Stations" },
                { number: "5000+", label: "Active Gamers" },
                { number: "24/7", label: "Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <h3 className="text-4xl font-bold text-[#00FF00]">{stat.number}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#00FF00]/5" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">Why Choose Hash Gaming?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience gaming like never before with our state-of-the-art facilities and premium services.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <MonitorPlay className="w-12 h-12" />,
                title: "Premium Setups",
                description: "4K displays, premium gaming chairs, and high-end peripherals for the ultimate gaming experience."
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Flexible Booking",
                description: "Book by the hour, day, or get a monthly membership. Gaming on your schedule."
              },
              {
                icon: <Trophy className="w-12 h-12" />,
                title: "Regular Tournaments",
                description: "Weekly tournaments with cash prizes. Compete with the best in your favorite games."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group p-8 rounded-2xl backdrop-blur-sm transition-all bg-gradient-to-br from-white/10 to-transparent border border-[#00FF00]/20 hover:border-[#00FF00]/40 hover:shadow-[0_0_30px_rgba(0,255,0,0.1)]"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-[#00FF00] mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Console Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold mb-20 text-center"
          >
            Available Consoles
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "PlayStation 5",
                image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80",
                price: "₹100/hour"
              },
              {
                name: "Xbox Series X",
                image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80",
                price: "₹100/hour"
              },
              {
                name: "Nintendo Switch",
                image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80",
                price: "₹100/hour"
              },
              {
                name: "Computer",
                image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=2940?auto=format&fit=crop&q=80",
                price: "₹100/hour"
              }
            ].map((console, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  src={console.image}
                  alt={console.name}
                  className="w-full h-[400px] object-cover transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-2xl font-bold mb-2">{console.name}</h3>
                  <p className="text-[#00FF00] font-bold mb-4">{console.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#00FF00] text-black font-bold py-3 rounded-full transition-all"
                  >
                    Available Soon
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* App Download Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-[#00FF00]/10"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              variants={itemVariants}
              className="flex-1"
            >
              <h2 className="text-5xl font-bold mb-6">Download Our App</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get instant access to gaming slots, exclusive deals, and manage your bookings on the go.
              </p>
              <div className="flex items-center gap-8 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-[#00FF00]/20"
                >
                  <QRCodeSVG
                    value="https://hashforgamers.co.in/app"
                    size={150}
                    level="H"
                    fgColor="#00FF00"
                    bgColor="transparent"
                  />
                </motion.div>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#00FF00] text-black font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Soon Avalaible for Android</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white/10 backdrop-blur-md border border-[#00FF00]/20 font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Soon Avalaible for iOS</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex-1 relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80"
                  alt="App Screenshot"
                  className="rounded-3xl shadow-2xl shadow-[#00FF00]/20"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
            alt="Gaming Setup"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/50" />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold mb-8">Ready to Join the Elite Gaming Community?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Get exclusive access to premium gaming stations, tournaments, and a vibrant community of gamers.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;