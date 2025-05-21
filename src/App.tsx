import React, { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Gamepad, Trophy, Users, Smartphone,
  Gift, Crown, MessageCircle, Download
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Canvas } from '@react-three/fiber';

import LocationOverlay from './components/LocationOverlay';
import PreRegistrationForm from './components/PreRegistrationForm';
import { GamingSetup } from './components/GamingSetup';
import { Logo } from './components/Logo';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const containerVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainFeatures = [
    { icon: <Gamepad />, title: 'Book Consoles', desc: 'Real-time bookings at top cafés.' },
    { icon: <Trophy />, title: 'Tournaments', desc: 'Win real rewards and build your rank.' },
    { icon: <Users />, title: 'Squad Up', desc: 'Your crew. Your rules.' },
    { icon: <Smartphone />, title: 'All-in-One App', desc: 'Manage your gaming journey.' }
  ];

  const exclusiveFeatures = [
    { icon: <Gift />, title: 'Early Access', desc: 'Be first to book and dominate.' },
    { icon: <Gift />, title: 'HashDrop Rewards', desc: 'Exclusive merch and coins.' },
    { icon: <Crown />, title: 'Founding Badge', desc: 'Legacy gamer status.' },
    { icon: <MessageCircle />, title: 'Discord Access', desc: 'Strategize with top players.' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <motion.nav className={`fixed w-full z-40 px-6 py-4 flex justify-between items-center transition-all ${scrolled ? 'bg-black/60 backdrop-blur' : 'bg-transparent'}`}>
        <Logo />
        <motion.button
          onClick={() => setIsPreRegisterOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold"
        >
          Pre Register
        </motion.button>
      </motion.nav>

      {/* Hero */}
      <div className="pt-32 px-6 text-center max-w-4xl mx-auto">
        <motion.h1 initial="hidden" animate="visible" variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
          Conquer the Throne. Rule the Game.
        </motion.h1>
        <p className="text-gray-400 text-lg mb-6">Book Pro-Level Consoles. Crush Lobbies. Win Tournaments.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => setIsPreRegisterOpen(true)} className="bg-red-600 px-6 py-2 rounded-full text-white font-bold flex items-center">
            Pre Register <ChevronRight className="ml-2" />
          </button>
          <button onClick={() => setIsLocationOverlayOpen(true)} className="border border-red-600 px-6 py-2 rounded-full text-white font-bold flex items-center">
            View Locations <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12 text-center flex justify-center gap-12">
        {['20+ Stations', '5K+ Gamers', '24/7 Access'].map((stat, idx) => (
          <div key={idx} className="text-lg font-medium text-gray-300">{stat}</div>
        ))}
      </div>

      {/* Features */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Why Join the Waitlist?</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {exclusiveFeatures.map((f, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02 }} className="p-6 rounded-lg bg-gray-900 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">{f.icon}<h3 className="font-semibold text-lg">{f.title}</h3></div>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hash Features */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">What is Hash?</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {mainFeatures.map((f, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02 }} className="p-6 rounded-lg bg-gray-900 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">{f.icon}<h3 className="font-semibold text-lg">{f.title}</h3></div>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
            <p className="text-gray-400 mb-6">Book, manage, and dominate — all from one app.</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold flex items-center gap-2">
                <Download className="w-5 h-5" /> Android
              </button>
              <button className="px-6 py-3 rounded-full bg-gray-800 text-white font-semibold flex items-center gap-2">
                <Download className="w-5 h-5" /> iOS
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <QRCodeSVG value="https://hashforgamers.co.in" size={150} level="H" fgColor="#E53E3E" bgColor="transparent" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-500 text-sm text-center py-8 border-t border-gray-800">
        <div>&copy; {new Date().getFullYear()} Hash for Gamers Pvt. Ltd. All rights reserved.</div>
      </footer>

      {/* Overlays */}
      <LocationOverlay isOpen={isLocationOverlayOpen} onClose={() => setIsLocationOverlayOpen(false)} />
      <PreRegistrationForm isOpen={isPreRegisterOpen} onClose={() => setIsPreRegisterOpen(false)} />
    </div>
  );
}

export default App;
