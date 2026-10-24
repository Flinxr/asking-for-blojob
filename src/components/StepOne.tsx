import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, HeartHandshake } from 'lucide-react';
import { DodgeButton } from './DodgeButton';
import { soundManager } from '../utils/sound';

interface StepOneProps {
  onYes: () => void;
}

export const StepOne: React.FC<StepOneProps> = ({ onYes }) => {
  const [dodgeCount, setDodgeCount] = useState(0);

  const handleDodge = () => {
    setDodgeCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    soundManager.playPopSound();
    onYes();
  };

  // Calculate scaling for the "Yes" button based on dodge attempts
  const yesScale = 1 + Math.min(dodgeCount * 0.12, 1.2);
  const noScale = Math.max(1 - dodgeCount * 0.05, 0.7);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto bg-white/85 backdrop-blur-2xl border border-pink-200/80 shadow-2xl rounded-3xl p-6 sm:p-10 text-center relative z-10 overflow-hidden"
    >
      {/* Decorative Corner Accents */}
      <div className="absolute top-3 right-3 text-pink-300 opacity-60">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-3 left-3 text-pink-300 opacity-60">
        <Heart size={20} className="fill-pink-200" />
      </div>

      {/* Cute Romantic Illustration / Heart Icon */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="relative"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-300 flex items-center justify-center shadow-lg shadow-rose-300/50 p-1">
            <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border-2 border-rose-200">
              <span className="text-5xl sm:text-6xl select-none">🐻❤️</span>
            </div>
          </div>
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -bottom-1 -right-1 bg-rose-500 text-white p-2 rounded-full shadow-md"
          >
            <Heart size={18} className="fill-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Question Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
        سولماز برام میخوریش؟ <span className="text-rose-500 inline-block animate-bounce">❤️</span>
      </h1>

      <p className="text-slate-600 text-sm sm:text-base font-medium mb-8 leading-relaxed">
        یک سوال خیلی ساده و قشنگ از طرف ایلیا! پاسخ مناسب رو انتخاب کن:
      </p>

      {/* Interactive Action Buttons Area */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 my-6 min-h-[120px] relative">
        {/* "آره" (YES) Button */}
        <motion.button
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.06 }}
          whileTap={{ scale: yesScale * 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          onClick={handleYesClick}
          className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-xl shadow-rose-400/40 border border-rose-300 cursor-pointer text-lg flex items-center justify-center gap-2 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          <HeartHandshake className="w-6 h-6 animate-pulse" />
          <span>آره، معلومه!</span>
        </motion.button>

        {/* "نه" (NO) Dodge Button */}
        <DodgeButton
          dodgeCount={dodgeCount}
          onDodge={handleDodge}
          scale={noScale}
        />
      </div>

      {/* Dynamic Hint Footer based on Dodge Count */}
      <div className="mt-6 pt-4 border-t border-pink-100 text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-2">
        {dodgeCount === 0 ? (
          <span className="text-rose-400 font-medium flex items-center gap-1">
            <span>✨</span>
            <span>راهنمایی: دکمه «آره» منتظر کلیک توست!</span>
          </span>
        ) : (
          <motion.span
            key={dodgeCount}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-600 font-bold bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 inline-flex items-center gap-1"
          >
            <span>😜</span>
            <span>تعداد فرار دکمه نه: {dodgeCount} بار! دکمه آره داره بزرگتر میشه!</span>
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};
