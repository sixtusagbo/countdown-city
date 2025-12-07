"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2026-07-06T00:00:00");

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsCountdownFinished(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isCountdownFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 animate-pulse">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 animate-bounce">
            🎉 Happy Birthday, Menma😍💙 🎉
          </h1>
          <div className="text-2xl md:text-4xl text-white font-semibold">
            Hope your special day is amazing! 🎂✨
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-blue-300 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-purple-300 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-pulse">
          Countdown to Menma&apos;s Birthday! 🎂
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-lg md:text-xl text-white/80 font-semibold">
              Days
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-lg md:text-xl text-white/80 font-semibold">
              Hours
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-lg md:text-xl text-white/80 font-semibold">
              Minutes
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 animate-pulse">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-lg md:text-xl text-white/80 font-semibold">
              Seconds
            </div>
          </div>
        </div>

        <div className="text-xl md:text-2xl text-white/90 font-medium">
          Until July 6th, 2025 at midnight 💙
        </div>
      </div>
    </div>
  );
}
