import React, { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, GamepadIcon, Clock, Trophy, Sparkles, Gamepad, MonitorPlay,
  Users2, Download, Smartphone, MapPin, CalendarClock, BadgePercent,
  Award, Gift, Crown, MessageCircle, Users, Dot
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import LocationOverlay from './components/LocationOverlay';
import PreRegistrationForm from './components/PreRegistrationForm';
import { GamingSetup } from './components/GamingSetup';
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const mainFeatures = [...]; // Kept as-is
  const exclusiveFeatures = [...]; // Kept as-is

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div ... />

      {/* Navbar */}
      <motion.nav ... >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <motion.button onClick={() => setIsPreRegisterOpen(true)} ... >Pre Register</motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center bg-black pt-24 md:pt-0">
        ...
        <Canvas ...>
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 6, 3]} intensity={1} />
          <Suspense fallback={null}>
            <GamingSetup />
          </Suspense>
        </Canvas>
      </div>

      {/* Features Sections */}
      <div className="py-20 bg-black relative">
        <motion.div className="text-center mb-20">...
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">...</motion.div>
      </div>

      {/* What is Hash Section */}
      <div className="py-20 bg-black relative">...</div>

      <LocationOverlay isOpen={isLocationOverlayOpen} onClose={() => setIsLocationOverlayOpen(false)} />
      <PreRegistrationForm isOpen={isPreRegisterOpen} onClose={() => setIsPreRegisterOpen(false)} />

      {/* Pricing Section */}
      <motion.div className="py-24 bg-black relative">...</motion.div>

      {/* App Download Section */}
      <motion.div className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-[#FF0000]/10">...</motion.div>

      {/* CTA Section */}
      <motion.div className="py-32 relative overflow-hidden">...</motion.div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8 mt-20">...</footer>
    </div>
  );
}

export default App;
