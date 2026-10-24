/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { BackgroundHearts } from './components/BackgroundHearts';
import { StepOne } from './components/StepOne';
import { StepTwo, ScheduleData } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import { soundManager } from './utils/sound';

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    date: '',
    time: '',
    treat: '',
    note: '',
  });

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.enabled = newState;
    if (newState) {
      soundManager.playPopSound();
    }
  };

  const handleYes = () => {
    setStep(2);
  };

  const handleSchedule = (data: ScheduleData) => {
    setScheduleData(data);
    setStep(3);
  };

  const handleRestart = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between p-4 sm:p-6 md:p-8 selection:bg-rose-200 selection:text-rose-900">
      {/* Animated Floating Hearts Background */}
      <BackgroundHearts />

      {/* Top Header Bar */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between py-3 px-4 rounded-2xl bg-white/60 backdrop-blur-md border border-pink-100 shadow-sm relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-rose-200">
            💕
          </div>
          <span className="font-extrabold text-slate-800 text-sm sm:text-base tracking-tight">
            سولماز & ایلیا
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'غیرفعال کردن صدا' : 'فعال کردن صدا'}
            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium"
          >
            {soundEnabled ? (
              <>
                <Volume2 size={16} />
                <span className="hidden sm:inline">صدا فعال</span>
              </>
            ) : (
              <>
                <VolumeX size={16} />
                <span className="hidden sm:inline">بی‌صدا</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Interactive Container */}
      <main className="flex-1 flex items-center justify-center py-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepOne key="step1" onYes={handleYes} />
          )}

          {step === 2 && (
            <StepTwo
              key="step2"
              onSchedule={handleSchedule}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepThree
              key="step3"
              data={scheduleData}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 text-xs text-slate-600 shadow-sm">
          <span>طراحی شده با</span>
          <Heart size={14} className="fill-rose-500 text-rose-500 animate-pulse" />
          <span>توسط ایلیا برای سولماز</span>
          <Sparkles size={12} className="text-amber-400 ml-0.5" />
        </div>
      </footer>
    </div>
  );
}
