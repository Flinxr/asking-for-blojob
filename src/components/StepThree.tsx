import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Copy, Check, Calendar, Clock, Utensils, Sparkles, RefreshCw, Download, Share2 } from 'lucide-react';
import { ScheduleData } from './StepTwo';
import { soundManager } from '../utils/sound';

interface StepThreeProps {
  data: ScheduleData;
  onRestart: () => void;
}

export const StepThree: React.FC<StepThreeProps> = ({ data, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play celebratory sound fanfare
    soundManager.playCelebrationSound();

    // Trigger full screen confetti explosion
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#ffffff'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#ffffff'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const shareText = `سلام ایلیا جان! ❤️\nمن قرارمون رو برای روز ${data.date} (${data.time}) هماهنگ کردم! 😋🍕\nخوراکی: ${data.treat}${
    data.note ? `\nیادداشت: ${data.note}` : ''
  }\nمرسی بابت دعوت زیبات! 💖`;

  const handleCopyText = () => {
    soundManager.playPopSound();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTicket = () => {
    soundManager.playPopSound();
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 600, 450);
    grad.addColorStop(0, '#fff1f2');
    grad.addColorStop(0.5, '#ffe4e6');
    grad.addColorStop(1, '#fecdd3');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 450);

    // Border Card
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 560, 410);

    // Header Title
    ctx.fillStyle = '#881337';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('❤️ کارت هماهنگی قرار سولماز و ایلیا ❤️', 300, 70);

    // Subtitle
    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('آفرین مرسی که برای ایلیا خوردی! 🎉', 300, 115);

    // Content Box
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 140, 500, 230);
    ctx.strokeStyle = '#fda4af';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 140, 500, 230);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'right';

    ctx.fillText(`📅 تاریخ قرار: ${data.date}`, 520, 185);
    ctx.fillText(`⏰ زمان: ${data.time}`, 520, 230);
    ctx.fillText(`🍽️ برنامه‌خوراکی: ${data.treat}`, 520, 275);
    if (data.note) {
      ctx.fillText(`💌 یادداشت: ${data.note}`, 520, 320);
    }

    // Ticket Footer
    ctx.fillStyle = '#9f1239';
    ctx.font = 'italic 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ثبت شده با نهایت عشق و انرژی مثبت 💕 | کد #ILYA-SOLMAZ-2026', 300, 405);

    // Trigger Download
    const link = document.createElement('a');
    link.download = `قرار_سولماز_و_ایلیا_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-2xl border-2 border-rose-300 shadow-2xl rounded-3xl p-6 sm:p-10 text-center relative z-10 overflow-hidden"
    >
      {/* Sparkle Header Graphics */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl"></div>

      {/* Celebration Trophy / Heart Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 15 }}
        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-300/60 mb-6 p-1 relative"
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-5xl sm:text-6xl animate-bounce">🎉</span>
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-md">
          <Sparkles className="w-5 h-5 fill-amber-400" />
        </div>
      </motion.div>

      {/* Main Required Celebration Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
        آفرین مرسی که برای ایلیا خوردی <span className="text-rose-500">❤️🎉</span>
      </h1>

      <p className="text-slate-600 text-xs sm:text-sm font-medium mb-6">
        قرار شما با موفقیت در سیستم ثبت شد و ایلیا بی‌صبرانه منتظر این روزه!
      </p>

      {/* Scheduled Ticket Card */}
      <div
        ref={ticketRef}
        className="bg-gradient-to-b from-rose-50 via-white to-pink-50 border-2 border-dashed border-rose-300 rounded-2xl p-5 text-right mb-6 shadow-inner relative"
      >
        <div className="flex items-center justify-between border-b border-rose-200 pb-3 mb-3">
          <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
            بلیط اختصاصی قرار 💌
          </span>
          <span className="text-[11px] text-slate-400 font-mono">#ILYA-SOLMAZ-LOVE</span>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-slate-500">تاریخ:</span>
            <span className="font-bold text-slate-900">{data.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-slate-500">زمان:</span>
            <span className="font-bold text-slate-900">{data.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-slate-500">برنامه خوراکی:</span>
            <span className="font-bold text-slate-900">{data.treat}</span>
          </div>

          {data.note && (
            <div className="flex items-start gap-2 pt-1 border-t border-rose-100">
              <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="text-slate-500">یادداشت سولماز:</span>
              <span className="font-medium text-rose-700 italic">«{data.note}»</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions (Copy Text, Download Ticket, Reschedule) */}
      <div className="space-y-3">
        <button
          onClick={handleCopyText}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-300/50 cursor-pointer text-sm flex items-center justify-center gap-2 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-200" />
              <span>متن پیام هماهنگی کپی شد! (آماده ارسال به ایلیا)</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>کپی متن پیام جهت ارسال به ایلیا در تلگرام / واتساپ</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleDownloadTicket}
            className="py-2.5 px-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 cursor-pointer text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-rose-500" />
            <span>دانلود عکس بلیط</span>
          </button>

          <button
            onClick={onRestart}
            className="py-2.5 px-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 cursor-pointer text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>تغییر تاریخ یا دوباره</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
