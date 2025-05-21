import React, { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Gamepad, Trophy, Users, Smartphone,
  Gift, Crown, MessageCircle, Download
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import LocationOverlay from './components/LocationOverlay';
import PreRegistrationForm from './components/PreRegistrationForm';
import { GamingSetup } from './components/GamingSetup';
import { Logo } from './components/Logo';
import { Canvas } from '@react-three/fiber';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    { icon: <Gamepad className="w-6 h-6 text-primary" />, title: "Book Consoles", desc: "Real-time bookings at gaming cafes." },
    { icon: <Trophy className="w-6 h-6 text-primary" />, title: "Join Tournaments", desc: "Climb ranks & win rewards." },
    { icon: <Users className="w-6 h-6 text-primary" />, title: "Squad Up", desc: "Play with friends in your city." },
    { icon: <Smartphone className="w-6 h-6 text-primary" />, title: "All-in-One App", desc: "One tap gaming control." }
  ];

  const perks = [
    { icon: <Gift className="w-6 h-6 text-primary" />, title: "Early Access", desc: "Book before the masses." },
    { icon: <Gift className="w-6 h-6 text-primary" />, title: "HashDrop Rewards", desc: "Coins, merch & more." },
    { icon: <Crown className="w-6 h-6 text-primary" />, title: "Founder's Badge", desc: "Legacy tag forever." },
    { icon: <MessageCircle className="w-6 h-6 text-primary" />, title: "Private Discord", desc: "Tactical pre-launch rooms." }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50" style={{ scaleX: scrollYProgress }} />

      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'backdrop-blur-md border-b border-primary/20' : 'bg-transparent'}`}> 
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,0,0,0.5)' }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreRegisterOpen(true)}
            className="bg-gradient-to-r from-primary to-accent text-white font-bold px-6 py-2 rounded-full">
            Pre Register
          </motion.button>
        </div>
      </motion.nav>

      <main className="relative min-h-screen flex items-center pt-24 md:pt-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">
              Conquer the Throne. Rule the Game
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8">
              Book Pro-Level Consoles. Crush Lobbies. Win Tournaments. This is Where Real Gamers Play.
            </motion.p>
            <div className="flex space-x-4">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,0,0,0.5)' }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsPreRegisterOpen(true)}
                className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-3 rounded-full text-lg flex items-center group">
                Pre Register Now <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsLocationOverlayOpen(true)}
                className="border border-[#DE3A3A]/20 px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] backdrop-blur-sm flex items-center">
                View Locations <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>

          <div className="flex-1 h-[1000px] w-full relative mt-10">
            <Canvas camera={{ position: [3, 3, 1], fov: 80 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <directionalLight position={[8, 6, 3]} intensity={1} />
              <Suspense fallback={null}>
                <GamingSetup />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </main>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">
              ⚔️ Why Join the Waitlist? ⚔️
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Power Comes to Those Who Wait.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {perks.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gray-800 flex items-center justify-center">{feature.icon}</div>
                  <h2 className="text-2xl font-bold text-white">{feature.title}</h2>
                </div>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LocationOverlay isOpen={isLocationOverlayOpen} onClose={() => setIsLocationOverlayOpen(false)} />
      <PreRegistrationForm isOpen={isPreRegisterOpen} onClose={() => setIsPreRegisterOpen(false)} />
    </div>
  );
}

export default App;
