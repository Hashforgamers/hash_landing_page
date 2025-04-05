import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-2"
    >
      <motion.img
        src="/logo.png"
        alt="Hash Logo"
        className="w h-20"
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}