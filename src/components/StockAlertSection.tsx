import React, { useState, useEffect } from "react";
import { AlertTriangle, ShoppingCart, Clock, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  total: number;
  remaining: number;
  threshold?: number;
};

export default function StockAlertSection({
  total,
  remaining,
  threshold = 30,
}: Props) {
  const used = Math.max(0, total - remaining);
  const percentRemaining = total > 0 ? Math.round((remaining / total) * 100) : 0;
  const percentUsed = 100 - percentRemaining;
  const isLow = percentRemaining <= threshold;
  const isCritical = percentRemaining <= 15;

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 45,
    seconds: 0,
  });

  // Pulse animation state
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { hours, minutes, seconds } = prev;
        
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }
        
        return prev;
      });
    }, 1000);

    // Pulse animation interval
    const pulseInterval = setInterval(() => {
      if (isCritical || isLow) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 600);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(pulseInterval);
    };
  }, [isCritical, isLow]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-2xl border-2 backdrop-blur-sm ${
        isCritical
          ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-red-200/50"
          : isLow
          ? "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-orange-200/50"
          : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
      }`}
    >
      {/* Header with urgency badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isPulsing ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6 }}
            className={`p-2 rounded-full ${
              isCritical 
                ? "bg-red-500 text-white" 
                : isLow 
                  ? "bg-orange-500 text-white" 
                  : "bg-green-500 text-white"
            }`}
          >
            <Zap className="h-5 w-5" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isCritical ? "SELLING FAST! 🔥" : "Limited Stock ⚡"}
            </h2>
            <p className="text-sm text-gray-600">
              Don't miss out on this popular item
            </p>
          </div>
        </div>
        
        {/* Urgency Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`px-4 py-2 rounded-full font-bold text-white shadow-lg ${
            isCritical
              ? "bg-gradient-to-r from-red-600 to-red-500"
              : isLow
              ? "bg-gradient-to-r from-orange-500 to-red-500"
              : "bg-gradient-to-r from-green-500 to-green-600"
          }`}
        >
          {percentRemaining}% LEFT
        </motion.div>
      </div>

      {/* Stock Progress with Flares */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            {used.toLocaleString()} already sold
          </span>
          <span className={`text-sm font-bold ${
            isCritical ? "text-red-600" : isLow ? "text-orange-600" : "text-green-600"
          }`}>
            Only {remaining.toLocaleString()} left!
          </span>
        </div>
        
        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          {/* Animated progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentUsed}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute left-0 top-0 h-full rounded-full ${
              isCritical
                ? "bg-gradient-to-r from-red-600 via-red-500 to-orange-500"
                : isLow
                ? "bg-gradient-to-r from-orange-500 to-amber-500"
                : "bg-gradient-to-r from-green-500 to-green-400"
            }`}
          />
          
          {/* Animated flare effect */}
          {isCritical && (
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
        </div>
      </div>

      {/* Countdown & Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 rounded-xl border-2 ${
            isCritical
              ? "bg-red-500/10 border-red-300"
              : isLow
              ? "bg-orange-500/10 border-orange-300"
              : "bg-green-500/10 border-green-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`h-4 w-4 ${
              isCritical ? "text-red-600" : isLow ? "text-orange-600" : "text-green-600"
            }`} />
            <span className="text-sm font-semibold text-gray-700">Offer ends in</span>
          </div>
          <div className="flex gap-1">
            {[
              { value: timeLeft.hours, label: "H" },
              { value: timeLeft.minutes, label: "M" },
              { value: timeLeft.seconds, label: "S" },
            ].map((item, index) => (
              <div key={index} className="flex-1 text-center">
                <div className={`font-mono text-lg font-bold ${
                  isCritical ? "text-red-700" : isLow ? "text-orange-700" : "text-green-700"
                }`}>
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sales Velocity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-gray-50 border-2 border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Selling fast</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(used / (total / 100))}%
          </div>
          <div className="text-xs text-gray-600">sold today</div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Animated Order Now Button */}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: isCritical 
              ? "0 10px 30px -10px rgba(239, 68, 68, 0.5)"
              : "0 10px 30px -10px rgba(249, 115, 22, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex-1 py-4 px-6 rounded-xl font-bold text-white overflow-hidden ${
            isCritical
              ? "bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/30"
              : isLow
              ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30"
              : "bg-gradient-to-r from-green-500 to-green-600"
          }`}
        >
          {/* Continuous border animation */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${
                isCritical ? "#fef08a" : isLow ? "#fed7aa" : "#86efac"
              }, transparent)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className={`absolute inset-[2px] rounded-xl ${
            isCritical ? "bg-red-600" : isLow ? "bg-orange-500" : "bg-green-500"
          }`} />
          
          <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
            <Zap className="h-5 w-5" />
            ORDER NOW
          </span>
        </motion.button>

        {/* Secondary Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Save
        </motion.button>
      </div>

      {/* Urgency Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`mt-4 p-3 rounded-lg text-center ${
          isCritical
            ? "bg-red-100 border border-red-300"
            : isLow
            ? "bg-orange-100 border border-orange-300"
            : "bg-green-100 border border-green-300"
        }`}
      >
        <p className={`text-sm font-semibold ${
          isCritical ? "text-red-700" : isLow ? "text-orange-700" : "text-green-700"
        }`}>
          {isCritical 
            ? "🚨 LAST CHANCE! This item will sell out soon!" 
            : isLow
            ? "⚡ Almost gone! People are buying this every minute!"
            : "✅ In stock — Order now to secure your item!"
          }
        </p>
      </motion.div>

      {/* Micro Copy */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        {isCritical 
          ? "⏰ Last updated just now • 12 people viewing"
          : "Free shipping • 30-day money-back guarantee"
        }
      </div>
    </motion.section>
  );
}