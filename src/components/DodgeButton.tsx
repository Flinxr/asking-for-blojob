import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';

interface DodgeButtonProps {
  dodgeCount: number;
  onDodge: () => void;
  scale?: number;
}

const FUNNY_PERSAN_MESSAGES = [
  'نمیتونی نه بگی! 😜',
  'اشتباه داری می‌زنی! 😂',
  'دستت نمی‌رسه! 💖',
  'تلاش نکن بی‌فایده‌ست! 🙈',
  'راه فراری نیست! ⚡',
  'فقط دکمه آره کار می‌کنه! 💖',
  'می‌دونم دلت آره می‌خواد! 😉',
  'دکمه نه خراب شده! 🛠️',
  'ایلیا منتظره‌ها! 👑',
  'زور نزن سولماز جان! 🥰',
];

export const DodgeButton: React.FC<DodgeButtonProps> = ({ dodgeCount, onDodge, scale = 1 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isMoved, setIsMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const moveButton = () => {
    soundManager.playDodgeSound();

    // Random displacement boundaries
    // Keep it within standard view area so it doesn't disappear off-screen
    const maxX = window.innerWidth < 640 ? 120 : 250;
    const maxY = window.innerWidth < 640 ? 150 : 200;

    let newX = (Math.random() - 0.5) * maxX * 2;
    let newY = (Math.random() - 0.5) * maxY * 2;

    // Make sure it moves at least 80px away from current position so it actually jumps noticeably
    if (Math.abs(newX - position.x) < 60) {
      newX = newX > 0 ? newX + 80 : newX - 80;
    }
    if (Math.abs(newY - position.y) < 60) {
      newY = newY > 0 ? newY + 80 : newY - 80;
    }

    setPosition({ x: newX, y: newY });
    setIsMoved(true);

    // Set funny message
    const randomMsg = FUNNY_PERSAN_MESSAGES[Math.floor(Math.random() * FUNNY_PERSAN_MESSAGES.length)];
    setCurrentMessage(randomMsg);

    onDodge();
  };

  useEffect(() => {
    if (currentMessage) {
      const timer = setTimeout(() => {
        setCurrentMessage(null);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentMessage]);

  return (
    <div className="relative inline-block">
      {/* Floating Teaser Bubble */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-full shadow-lg border border-rose-300 pointer-events-none z-30"
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        animate={{
          x: position.x,
          y: position.y,
          scale: Math.max(0.65, scale),
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        onMouseEnter={moveButton}
        onTouchStart={moveButton}
        onClick={(e) => {
          e.preventDefault();
          moveButton();
        }}
        className={`px-7 py-3.5 rounded-2xl font-bold text-slate-700 bg-slate-100 hover:bg-rose-100 border-2 border-slate-300/80 hover:border-rose-300 shadow-md transition-colors cursor-pointer select-none text-base relative z-20 active:scale-90 ${
          isMoved ? 'shadow-rose-200 shadow-lg' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          <span>نه</span>
          <span className="text-xs text-slate-400">({dodgeCount > 0 ? `${dodgeCount} بار تلاش` : 'غیرممکن'})</span>
        </span>
      </motion.button>
    </div>
  );
};
