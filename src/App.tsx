import React, { useEffect, useState , Suspense} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, GamepadIcon, Clock, Trophy, Sparkles, Gamepad, MonitorPlay, Users2, Download, Smartphone, MapPin, CalendarClock, BadgePercent, Award, Gift, Crown, MessageCircle , Users} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Dot } from 'lucide-react';

import LocationOverlay from './components/LocationOverlay';
import PreRegistrationForm from './components/PreRegistrationForm';
import  {GamingSetup}  from './components/GamingSetup'
import { Logo } from './components/Logo';
import { Canvas } from '@react-three/fiber';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1, y: 20 },
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


  const mainFeatures = [
    {
      icon: <Gamepad className="w-6 h-6 text-primary" />,
      title: "Book Next-Gen Consoles",
      description: "Real-time bookings at your city’s top gaming cafes."
    },
    {
      icon: <Trophy className="w-6 h-6 text-primary" />,
      title: "Join Competitive Tournaments",
      description: "Climb the ranks. Win real rewards. Build your legacy."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Squad Up & Connect",
      description: "Your crew. Your arena. Your rules."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "All-in-One Gaming App",
      description: "One tap. Full control of your gaming journey."
    }
  ];

  // Define your features array (outside the JSX for clarity)
  const exclusiveFeatures = [
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      title: "Early Access to the App",
      description: "Be the first to book arenas and dominate leaderboards."
    },
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      title: "Exclusive HashDrop Rewards",
      description: "Get limited-edition merch, coins, and tournament invites."
    },
    {
      icon: <Crown className="w-6 h-6 text-primary" />,
      title: "Founding Member Badge",
      description: "Your tag will carry legacy. Forever."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Private Discord Access",
      description: "Strategize with top gamers and influencers before launch."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

 {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-40 transition-all duration-300 ${
            scrolled ? 'backdrop-blur-md border-b border-primary/20' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,0,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreRegisterOpen(true)}
            className="bg-gradient-to-r from-primary to-accent text-white font-bold px-6 py-2 rounded-full"
          >
            Pre Register
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center bg-black pt-24 md:pt-0"> {/* Add pt-24 for mobile */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent"
          >
              Conquer the Throne. Rule the Game
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            variants={itemVariants}
            className="flex items-center space-x-2 mb-4"
            >
              <span className="flex items-center gap-2  text-white mb-8 px-2 py-1 rounded-full text-sm font-bold animate-pulse border border-[#DE3A3A]/20 px-8 py-3 rounded-full transition-all shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                <span className="w-3 h-3 rounded-full border-2 border-[#DE3A3A]" />
                Live Soon
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Book Pro-Level Consoles. Crush Lobbies. Win Tournaments. This is Where Real Gamers Play.
            </motion.p>



            <div className="flex space-x-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(255,0,0,0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPreRegisterOpen(true)}
                className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-3 rounded-full text-lg flex items-center group"
              >
                Pre Register Now
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#FF0000" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLocationOverlayOpen(true)}
                className="border border-[#DE3A3A]/20 px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] backdrop-blur-sm flex items-center"
              >
                View Locations
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>

            <motion.div
              variants={containerVariants}
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-2xl "
            >
              {[
                { number: "20+", label: "Gaming Stations" },
                { number: "5K+", label: "Active Gamers" },
                { number: "24/7", label: "Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <h3 className="text-4xl font-bold text-[#FF0000] bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">{stat.number}</h3>
                  <p className="text-white">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>


          </div>

          {/* 3D Canvas */}
          <div className="flex-1 h-[1000px] w-full relative mt-10">
            <div className="absolute inset-0 from-primary/20 via-transparent to-transparent" />
            <Canvas
              camera={{ position: [3, 3, 1], fov: 80 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[8, 6, 3]} intensity={1} />
              <Suspense fallback={null}>
                <GamingSetup />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-black relative">
      <div className="absolute inset-0 from-secondary/20 via-dark to-dark" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">⚔️ Why Join the Waitlist?⚔️</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Power Comes to Those Who Wait.
          </p>
        </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {exclusiveFeatures.map((feature, index) => (
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

      </div>
    </div>


    <div className="py-20 bg-black relative">
  <div className="absolute inset-0 from-secondary/20 via-dark to-dark" />
  <div className="container mx-auto px-6 relative z-10">
    <motion.div
      variants={itemVariants}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">🎮 What Is Hash? </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Hash is not just an app.  
        It’s your gaming command center.
      </p>
    </motion.div>

    <motion.div 
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {mainFeatures.map((feature, index) => (
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

  </div>
</div>



      <LocationOverlay
                isOpen={isLocationOverlayOpen}
                onClose={() => setIsLocationOverlayOpen(false)}
              />
      <PreRegistrationForm isOpen={isPreRegisterOpen} onClose={() => setIsPreRegisterOpen(false)} />


      {/* App Download Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-[#FF0000]/10"
      >
<div className="container mx-auto px-6">
  <div className="flex flex-col md:flex-row items-center justify-between gap-16">
    <motion.div variants={itemVariants} className="flex-1">
      <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">
        Download Our App
      </h2>
      <p className="text-xl text-gray-300 mb-10">
        Get instant access to gaming slots, exclusive deals, and manage your bookings on the go.
      </p>
      <div className="flex items-center gap-12 flex-wrap mb-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-8 rounded-3xl border border-primary/40 backdrop-blur-md bg-gray-900/85 shadow-[0_0_30px_rgba(229,62,62,0.5)] flex items-center justify-center"
          style={{ minWidth: 170, minHeight: 170 }}
        >
          <QRCodeSVG
            value="https://hashforgamers.co.in/"
            size={150}
            level="H"
            fgColor="#E53E3E"  // softer red
            bgColor="transparent"
          />
        </motion.div>
        <div className="space-y-5 min-w-[240px] flex flex-col justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#E53E3E] text-black font-bold px-8 py-4 rounded-full flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(229,62,62,0.7)]"
          >
            <Download className="w-5 h-5" />
            <span>Coming Soon on Android</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gray-900/90 border border-primary/40 backdrop-blur-md text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(229,62,62,0.3)]"
          >
            <Download className="w-5 h-5" />
            <span>Coming Soon on iOS</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
    <motion.div variants={itemVariants} className="flex-1 relative">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <img
          src="/image/home.png"
          alt="App Screenshot"
          className="w-full h-auto rounded-2xl "
        />
      </motion.div>
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
      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <a href="/about" className="hover:text-white transition-colors duration-200">
              About Us
            </a>
            <span className="mx-2">|</span>
            <a href="/terms" className="hover:text-white transition-colors duration-200">
              Terms & Conditions
            </a>
            <span className="mx-2">|</span>
            <a href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </a>
          </div>
          <div className="text-center md:text-right">
            &copy; {new Date().getFullYear()} Hash For Gamers Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;