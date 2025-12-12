"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

// Constants
const WEEKS_PER_YEAR = 52;
const AUTOMATION_EFFICIENCY = 0.95; // 95% of manual work eliminated

// Currency formatter for Euros
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format hours with proper pluralization
const formatHours = (hours: number): string => {
  return `${hours} ${hours === 1 ? "hour" : "hours"}`;
};

// The actual ROI calculation formula
interface ROICalculation {
  weeklyCost: number;
  annualLaborCost: number;
  automatedCost: number;
  totalSaved: number;
  errorCostSaved: number;
  totalWithErrorSavings: number;
}

function calculateSavings(
  hoursPerWeek: number,
  hourlyCost: number,
  errorRate: number
): ROICalculation {
  // Core calculation: What you're spending now on manual work
  const weeklyCost = hoursPerWeek * hourlyCost;
  const annualLaborCost = weeklyCost * WEEKS_PER_YEAR;

  // After automation: Only 5% of the cost remains (95% efficiency)
  const automatedCost = annualLaborCost * (1 - AUTOMATION_EFFICIENCY);

  // Labor savings
  const totalSaved = annualLaborCost - automatedCost;

  // Error cost savings (errors cost money - automation reduces them)
  // Assume each error costs 2x the hourly rate to fix, and automation reduces errors by 90%
  const weeklyErrors = hoursPerWeek * (errorRate / 100);
  const errorCostPerWeek = weeklyErrors * hourlyCost * 2;
  const annualErrorCost = errorCostPerWeek * WEEKS_PER_YEAR;
  const errorCostSaved = annualErrorCost * 0.9; // 90% error reduction

      return {
    weeklyCost,
    annualLaborCost,
    automatedCost,
    totalSaved,
    errorCostSaved,
    totalWithErrorSavings: totalSaved + errorCostSaved,
  };
}

// Animated number component with smooth counting
function AnimatedValue({
  value,
  formatter,
  className,
}: {
  value: number;
  formatter: (n: number) => string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);
  const animationRef = useRef<number>();

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValue = startValue + (endValue - startValue) * eased;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  return (
    <span className={className}>{formatter(Math.round(displayValue))}</span>
  );
}

export function ROICalculator() {
  // State for the three main inputs
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(25);
  const [errorRate, setErrorRate] = useState(5);

  // Calculate results in real-time
  const results = calculateSavings(hoursPerWeek, hourlyCost, errorRate);

  // Determine savings tier for visual feedback
  const getSavingsTier = useCallback((amount: number) => {
    if (amount >= 50000) return "exceptional";
    if (amount >= 25000) return "excellent";
    if (amount >= 10000) return "good";
    return "starter";
  }, []);

  const savingsTier = getSavingsTier(results.totalWithErrorSavings);

  return (
    <section
      id="roi-calculator"
      className="py-16 md:py-24 bg-[#F9FAFB] dark:bg-[#0B0C10] scroll-mt-24 transition-colors duration-300"
    >
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#0F0F0F] dark:text-white">
            Calculate Your Automation ROI
          </h2>
          <p className="text-lg text-[#333] dark:text-white/70 max-w-2xl mx-auto">
            See exactly how much you&apos;re burning on manual work—and what
            automation can save you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Panel */}
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-lg">
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* Hours per Week Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium text-[#0F0F0F] dark:text-white">
                      Hours Spent on Manual Tasks
                      <span className="block text-sm font-normal text-[#666] dark:text-white/50 mt-1">
                        Weekly repetitive work per person
                      </span>
                    </Label>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#0F0F0F] dark:text-white tabular-nums">
                        {hoursPerWeek}
                      </span>
                      <span className="text-sm text-[#666] dark:text-white/60 ml-1">
                        hrs/week
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={(value) => setHoursPerWeek(value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#999] dark:text-white/40">
                    <span>0 hours</span>
                    <span>100 hours</span>
                  </div>
                </div>

                {/* Hourly Cost Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium text-[#0F0F0F] dark:text-white">
                      Hourly Labor Cost
                      <span className="block text-sm font-normal text-[#666] dark:text-white/50 mt-1">
                        Fully loaded employee cost
                      </span>
                    </Label>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#0F0F0F] dark:text-white tabular-nums">
                        €{hourlyCost}
                      </span>
                      <span className="text-sm text-[#666] dark:text-white/60 ml-1">
                        /hour
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[hourlyCost]}
                    onValueChange={(value) => setHourlyCost(value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#999] dark:text-white/40">
                    <span>€0</span>
                    <span>€100</span>
                </div>
                </div>

                {/* Error Rate Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium text-[#0F0F0F] dark:text-white">
                      Error Rate
                      <span className="block text-sm font-normal text-[#666] dark:text-white/50 mt-1">
                        Mistakes requiring rework
                      </span>
                    </Label>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#0F0F0F] dark:text-white tabular-nums">
                        {errorRate}%
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[errorRate]}
                    onValueChange={(value) => setErrorRate(value[0])}
                    min={0}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#999] dark:text-white/40">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Quick insight */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                  <p className="text-sm text-[#666] dark:text-white/60">
                    <span className="font-medium text-[#0F0F0F] dark:text-white">
                      Current weekly cost:
                    </span>{" "}
                    <AnimatedValue
                      value={results.weeklyCost}
                      formatter={formatCurrency}
                      className="font-semibold text-[#0F0F0F] dark:text-white"
                    />{" "}
                    × 52 weeks ={" "}
                    <AnimatedValue
                      value={results.annualLaborCost}
                      formatter={formatCurrency}
                      className="font-semibold text-amber-600 dark:text-amber-400"
                    />
                    /year
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Panel */}
              <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Main Savings Card - The Hero */}
            <Card
              className={cn(
                "rounded-2xl border-2 shadow-xl transition-all duration-500",
                "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
                "dark:from-emerald-950/40 dark:via-green-950/30 dark:to-teal-950/40",
                savingsTier === "exceptional" &&
                  "border-emerald-500 dark:border-emerald-400 shadow-emerald-200 dark:shadow-emerald-900/50",
                savingsTier === "excellent" &&
                  "border-green-500 dark:border-green-400 shadow-green-200 dark:shadow-green-900/50",
                savingsTier === "good" &&
                  "border-teal-500 dark:border-teal-400 shadow-teal-200 dark:shadow-teal-900/50",
                savingsTier === "starter" &&
                  "border-gray-300 dark:border-white/20 shadow-gray-200 dark:shadow-none"
              )}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-2">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    Estimated Annual Savings
                  </span>
                </div>

                <div className="py-4">
                  <AnimatedValue
                    value={results.totalWithErrorSavings}
                    formatter={formatCurrency}
                    className={cn(
                      "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
                      "text-emerald-600 dark:text-emerald-400"
                    )}
                  />
                </div>

                <p className="text-sm text-emerald-700/70 dark:text-emerald-400/60 mt-2">
                  Based on 95% automation efficiency
                </p>

                {/* Savings breakdown */}
                <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-800/50 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-xs text-[#666] dark:text-white/50 uppercase tracking-wide mb-1">
                      Labor Savings
                    </p>
                    <AnimatedValue
                      value={results.totalSaved}
                      formatter={formatCurrency}
                      className="text-lg font-bold text-[#0F0F0F] dark:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#666] dark:text-white/50 uppercase tracking-wide mb-1">
                      Error Reduction
                    </p>
                    <AnimatedValue
                      value={results.errorCostSaved}
                      formatter={formatCurrency}
                      className="text-lg font-bold text-[#0F0F0F] dark:text-white"
                    />
                  </div>
                </div>
                </CardContent>
              </Card>

            {/* Supporting metrics */}
            <div className="grid grid-cols-2 gap-4">
              {/* Hours Saved */}
              <Card className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md">
                <CardContent className="p-5">
                  <p className="text-xs text-[#666] dark:text-white/50 uppercase tracking-wide mb-2">
                    Hours Freed Up
                  </p>
                  <div className="flex items-baseline gap-1">
                    <AnimatedValue
                      value={hoursPerWeek * AUTOMATION_EFFICIENCY * WEEKS_PER_YEAR}
                      formatter={(n) => Math.round(n).toLocaleString("de-DE")}
                      className="text-2xl font-bold text-[#0F0F0F] dark:text-white"
                    />
                    <span className="text-sm text-[#666] dark:text-white/60">
                      /year
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Savings */}
              <Card className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md">
                <CardContent className="p-5">
                  <p className="text-xs text-[#666] dark:text-white/50 uppercase tracking-wide mb-2">
                    Monthly Savings
                  </p>
                  <AnimatedValue
                    value={results.totalWithErrorSavings / 12}
                    formatter={formatCurrency}
                    className="text-2xl font-bold text-[#0F0F0F] dark:text-white"
                  />
                </CardContent>
              </Card>
              </div>

            {/* The Formula Explanation */}
            <Card className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
              <CardContent className="p-5">
                <h4 className="text-sm font-semibold text-[#0F0F0F] dark:text-white mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#00B8D9]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  How We Calculate
                </h4>
                <div className="space-y-2 text-sm text-[#666] dark:text-white/60">
                      <div className="flex justify-between">
                    <span>Weekly manual cost:</span>
                    <span className="font-mono text-[#0F0F0F] dark:text-white">
                      {hoursPerWeek}h × €{hourlyCost} ={" "}
                      {formatCurrency(results.weeklyCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                    <span>Annual manual cost:</span>
                    <span className="font-mono text-[#0F0F0F] dark:text-white">
                      {formatCurrency(results.weeklyCost)} × 52 ={" "}
                      {formatCurrency(results.annualLaborCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                    <span>After automation (5%):</span>
                    <span className="font-mono text-[#0F0F0F] dark:text-white">
                      {formatCurrency(results.automatedCost)}
                        </span>
                      </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between font-semibold">
                    <span className="text-[#0F0F0F] dark:text-white">
                      You save:
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(results.totalSaved)}
                          </span>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
        </div>

        {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-[#666] dark:text-white/50 mb-4">
            These estimates are based on 95% automation efficiency—a realistic
            benchmark for n8n and AI workflows.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#7B61FF] hover:bg-[#6C55E0] dark:bg-[#8B5CF6] dark:hover:bg-[#7B4CF6] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Your Custom Assessment
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
            </motion.div>
      </div>
    </section>
  );
}
