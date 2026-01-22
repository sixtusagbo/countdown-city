"use client";

import { useState, useEffect, useMemo } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: string;
  max: number;
  color: string;
  delay: number;
}

function TimeUnit({ value, label, max, color, delay }: TimeUnitProps) {
  const progress = ((max - value) / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="glass-card rounded-3xl p-6 md:p-8 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${color}`}
      />

      <div className="relative z-10">
        {/* Circular progress indicator */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
          <svg className="progress-ring w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="progress-ring-circle"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b9d" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          {/* Number display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold text-white countdown-number font-mono tracking-tight">
              {value.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Label */}
        <div className="text-center">
          <span className="text-sm md:text-base uppercase tracking-[0.2em] text-white/60 font-medium">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      color: ["#ff6b9d", "#c084fc", "#60a5fa", "#22d3ee", "#fbbf24"][
        Math.floor(Math.random() * 5)
      ],
      size: 8 + Math.random() * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orbs */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full animate-drift opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full animate-drift opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%)",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full animate-drift opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.4) 0%, transparent 70%)",
          animationDelay: "-10s",
        }}
      />
      <div
        className="absolute top-10 right-1/4 w-64 h-64 rounded-full animate-drift opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)",
          animationDelay: "-7s",
        }}
      />

      {/* Small floating particles */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-60" />
      <div
        className="absolute top-2/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-50"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float opacity-40"
        style={{ animationDelay: "-1s" }}
      />
    </div>
  );
}

function CelebrationScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 animate-gradient" />

      <Confetti />
      <FloatingOrbs />

      <div className="text-center z-10 px-4 animate-celebrate">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            Happy Birthday!
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text drop-shadow-lg">
            Menma
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
            Wishing you the most amazing day filled with love, joy, and all the
            happiness in the world!
          </p>
        </div>

        {/* Decorative hearts */}
        <div className="mt-12 flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 md:w-6 md:h-6 bg-white/80 rounded-full animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [targetDate] = useState(new Date("2026-07-06T00:00:00"));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsCountdownFinished(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isCountdownFinished) {
    return <CelebrationScreen />;
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days", max: 365, color: "bg-pink-500/20" },
    { value: timeLeft.hours, label: "Hours", max: 24, color: "bg-purple-500/20" },
    { value: timeLeft.minutes, label: "Minutes", max: 60, color: "bg-blue-500/20" },
    { value: timeLeft.seconds, label: "Seconds", max: 60, color: "bg-cyan-500/20" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0f]">
      <FloatingOrbs />

      {/* Main content */}
      <div
        className={`text-center z-10 px-4 md:px-8 max-w-6xl mx-auto transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="gradient-text">Countdown to Auri&apos;s Birthday</span>
          </h1>
        </div>

        {/* Countdown grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {timeUnits.map((unit, index) => (
            <TimeUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              max={unit.max}
              color={unit.color}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Target date display */}
        <div className="glass-card rounded-2xl px-6 py-4 md:px-8 md:py-5 inline-block">
          <p className="text-base md:text-lg text-white/70 font-medium tracking-wide">
            <span className="text-white/50">Target:</span>{" "}
            <span className="text-white">
              {targetDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  );
}
