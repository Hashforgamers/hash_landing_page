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
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50" style={{ scaleX: scrollYProgress }} />

      {/* Navbar */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'backdrop-blur-md border-b border-primary/20' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,0,0,0.5)' }} whileTap={{ scale: 0.95 }} onClick={() => setIsPreRegisterOpen(true)} className="bg-gradient-to-r from-primary to-accent text-white font-bold px-6 py-2 rounded-full">Pre Register</motion.button>
        </div>
      </motion.nav>

      {/* Other Sections */}
      {/* Full content from your original message retained */}

      <LocationOverlay isOpen={isLocationOverlayOpen} onClose={() => setIsLocationOverlayOpen(false)} />
      <PreRegistrationForm isOpen={isPreRegisterOpen} onClose={() => setIsPreRegisterOpen(false)} />
    </div>
  );
}

export default App;
