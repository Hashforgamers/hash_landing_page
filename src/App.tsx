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
          scrolled ? 'bg-dark/90 backdrop-blur-md border-b border-primary/20' : 'bg-transparent'
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
      <div className="relative min-h-screen flex items-center bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-2 mb-4"
          >
            <span className="flex items-center gap-2  text-white mb-8 px-2 py-1 rounded-full text-sm font-bold animate-pulse border border-[#DE3A3A]/20 px-8 py-3 rounded-full transition-all shadow-[0_0_30px_rgba(255,0,0,0.5)]">
              <span className="w-3 h-3 rounded-full border-2 border-[#DE3A3A]" />
              Live Soon
            </span>
          </motion.div>


            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent"
            >
              Conquer the Throne. Rule the Game
            </motion.h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Gift className="w-12 h-12 text-primary mb-4" />,
              title: "Early Access to the App",
              description: "Be the first to book arenas and dominate leaderboards."
            },
            {
              icon: <Gift className="w-12 h-12 text-primary mb-4" />,
              title: "Exclusive HashDrop Rewards",
              description: "Get limited-edition merch, coins, and tournament invites."
            },
            {
              icon: <Crown className="w-12 h-12 text-primary mb-4" />,
              title: "Founding Member Badge",
              description: "Your tag will carry legacy. Forever."
            },
            {
              icon: <MessageCircle className="w-12 h-12 text-primary mb-4" />,
              title: "Private Discord Access",
              description: "Strategize with top gamers and influencers before launch."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-gradient-to-br from-dark to-primary/10 border border-primary/20 backdrop-blur-sm text-center"
            >
              <div className="flex justify-center text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
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

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          icon: <Gamepad className="w-12 h-12 text-primary mb-4" />,
          title: "Book Next-Gen Consoles",
          description: "Real-time bookings at your city’s top gaming cafes."
        },
        {
          icon: <Trophy className="w-12 h-12 text-primary mb-4" />,
          title: "Join Competitive Tournaments",
          description: "Climb the ranks. Win real rewards. Build your legacy."
        },
        {
          icon: <Users className="w-12 h-12 text-primary mb-4" />,
          title: "Squad Up & Connect",
          description: "Your crew. Your arena. Your rules."
        },
        {
          icon: <Smartphone className="w-12 h-12 text-primary mb-4" />,
          title: "All-in-One Gaming App",
          description: "One tap. Full control of your gaming journey."
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ y: -5 }}
          className="p-6 rounded-xl bg-gradient-to-br from-dark to-primary/10 border border-primary/20 backdrop-blur-sm text-center"
        >
          <div className="flex justify-center text-3xl mb-3">{feature.icon}</div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </div>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              variants={itemVariants}
              className="flex-1"
            >
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">Download Our App</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get instant access to gaming slots, exclusive deals, and manage your bookings on the go.
              </p>
              <div className="flex items-center gap-8 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-[#FF0000]/20"
                >
                  <QRCodeSVG
                    value="https://hashforgamers.co.in/app"
                    size={150}
                    level="H"
                    fgColor="#FF0000"
                    bgColor="transparent"
                  />
                </motion.div>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#FF0000] text-black font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Soon Avalaible for Android</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white/10 backdrop-blur-md border border-[#FF0000]/20 font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2"
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
                  src="/image/home.png"
                  alt="App Screenshot"
                  className="w-full h-auto bg-transparent"
                  style={{ boxShadow: 'none', borderRadius: 0 }}
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
    </div>
  );
}

export default App;