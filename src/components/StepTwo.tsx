import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Utensils, MessageSquare, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/sound';

export interface ScheduleData {
  date: string;
  time: string;
  treat: string;
  note: string;
}

interface StepTwoProps {
  onSchedule: (data: ScheduleData) => void;
  onBack: () => void;
}

// Generate next 12 days in Persian calendar labels
const generateUpcomingDays = () => {
  const daysOfWeekFa = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const monthsFa = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  const days = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);

    const dayOfWeek = daysOfWeekFa[d.getDay()];
    const dayNum = d.getDate();
    // Approximate Persian month for display feel
    const monthName = monthsFa[(d.getMonth() + 7) % 12];

    let relativeLabel = '';
    if (i === 0) relativeLabel = 'امروز ✨';
    else if (i === 1) relativeLabel = 'فردا 💖';
    else if (d.getDay() === 5 || d.getDay() === 4) relativeLabel = 'آخر هفته 🎉';

    days.push({
      id: d.toISOString().split('T')[0],
      dayName: dayOfWeek,
      dayNum: dayNum.toLocaleString('fa-IR'),
      monthName: monthName,
      fullText: `${dayOfWeek} ${dayNum.toLocaleString('fa-IR')} ${monthName}`,
      relativeLabel,
    });
  }
  return days;
};

const TIME_SLOTS = [
  { id: 't1', label: 'عصر ساعت ۶ ☕' },
  { id: 't2', label: 'شب ساعت ۹ 🌙' },
  { id: 't3', label: 'ظهر ساعت ۱ 🍕' },
  { id: 't4', label: 'هر زمانی که ایلیا بگه ❤️' },
];

const TREAT_OPTIONS = [
  { id: 'f1', label: 'پیتزا و کوکاکولا 🍕' },
  { id: 'f2', label: 'بستنی نوتلا و قیماق 🍦' },
  { id: 'f3', label: 'کافه و کیک شکلاتی ☕🍰' },
  { id: 'f4', label: 'یک شام خوشمزه دونفره 🍝' },
];

export const StepTwo: React.FC<StepTwoProps> = ({ onSchedule, onBack }) => {
  const upcomingDays = generateUpcomingDays();
  const [selectedDate, setSelectedDate] = useState(upcomingDays[1].fullText); // Default tomorrow
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0].label);
  const [selectedTreat, setSelectedTreat] = useState(TREAT_OPTIONS[0].label);
  const [note, setNote] = useState('');

  const handleSelectDate = (dateText: string) => {
    soundManager.playPopSound();
    setSelectedDate(dateText);
  };

  const handleSelectTime = (timeText: string) => {
    soundManager.playPopSound();
    setSelectedTime(timeText);
  };

  const handleSelectTreat = (treatText: string) => {
    soundManager.playPopSound();
    setSelectedTreat(treatText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPopSound();
    onSchedule({
      date: selectedDate,
      time: selectedTime,
      treat: selectedTreat,
      note: note.trim(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-2xl border border-pink-200 shadow-2xl rounded-3xl p-6 sm:p-9 text-right relative z-10"
    >
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-6">
        <button
          onClick={onBack}
          className="text-xs sm:text-sm text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors cursor-pointer bg-slate-100 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-slate-200"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به سوال</span>
        </button>
        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
          <span>مرحله ۲ از ۲</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
        </span>
      </div>

      {/* Main Step Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2">
          چه روزی هماهنگ میکنی که برام بخوریش؟ 😋❤️
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          روز، ساعت و خوراکی مورد علاقه‌ت رو انتخاب کن تا با ایلیا ثبت بشه!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Calendar Picker */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
            <CalendarIcon className="w-4 h-4 text-rose-500" />
            <span>۱. انتخاب روز تقویم:</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {upcomingDays.map((day) => {
              const isSelected = selectedDate === day.fullText;
              return (
                <button
                  type="button"
                  key={day.id}
                  onClick={() => handleSelectDate(day.fullText)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-rose-500 to-pink-600 text-white border-rose-500 shadow-md shadow-rose-300/50 scale-[1.02]'
                      : 'bg-white hover:bg-rose-50 text-slate-700 border-rose-100 hover:border-rose-300'
                  }`}
                >
                  {day.relativeLabel && (
                    <span
                      className={`text-[10px] font-bold block mb-0.5 px-1.5 py-0.2 rounded-full mx-auto w-max ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'
                      }`}
                    >
                      {day.relativeLabel}
                    </span>
                  )}
                  <span className={`block text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                    {day.dayName}
                  </span>
                  <span className={`block text-lg font-black my-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {day.dayNum}
                  </span>
                  <span className={`block text-[10px] ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                    {day.monthName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
            <Clock className="w-4 h-4 text-rose-500" />
            <span>۲. زمان پیشنهادی:</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot.label;
              return (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => handleSelectTime(slot.label)}
                  className={`py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <span>{slot.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Treat / Food Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
            <Utensils className="w-4 h-4 text-rose-500" />
            <span>۳. چی برات بیارم بخوری؟</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TREAT_OPTIONS.map((treat) => {
              const isSelected = selectedTreat === treat.label;
              return (
                <button
                  type="button"
                  key={treat.id}
                  onClick={() => handleSelectTreat(treat.label)}
                  className={`py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <span>{treat.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Custom Note */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2">
            <MessageSquare className="w-4 h-4 text-rose-500" />
            <span>۴. یادداشت خاص برای ایلیا (اختیاری):</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="مثلاً: ایلیا جون سس قرمز اضافی هم یادش نره! 😉"
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all resize-none bg-white"
          />
        </div>

        {/* Submit Schedule Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-xl shadow-rose-400/40 border border-rose-300 cursor-pointer text-base sm:text-lg flex items-center justify-center gap-2 mt-4"
        >
          <Heart className="w-5 h-5 fill-white animate-bounce" />
          <span>ثبت نهایی قرار با ایلیا ❤️</span>
        </motion.button>
      </form>
    </motion.div>
  );
};
