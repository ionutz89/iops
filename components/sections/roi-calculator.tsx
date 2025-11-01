"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { calculateROI, formatCurrency, formatNumber, type ROIInputs } from "@/lib/roi-calculations";
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export function ROICalculator() {
  const defaults = {
    teamSize: 10,
    incidentsPerWeek: 5,
    manualHoursPerWeek: 80,
    hourlyRate: 50,
    incidentCost: 1500,
    setupCost: 100000,
    automationEfficiency: 70,
    incidentReduction: 80,
  };

  const [inputs, setInputs] = useState<ROIInputs>(defaults);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const handleCalculate = () => {
    calculateROI(inputs);
    setHasCalculated(true);

    // Add delay before showing results for natural feel
    setTimeout(() => {
      setShowResults(true);
      // Smooth scroll to results section
      setTimeout(() => {
        const el = document.getElementById("roi-result");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 400);
    }, 300);
  };

  // Generate chart data for ROI vs Team Size based on actual calculations
  const chartData = useMemo(() => {
    // Generate chart data for team sizes 1-30, calculating actual ROI for each
    return Array.from({ length: 30 }, (_, i) => {
      const teamSize = i + 1;
      const testInputs = { ...inputs, teamSize };
      const testResults = calculateROI(testInputs);
      return {
        teamSize,
        roi: testResults.roi,
      };
    });
  }, [inputs]);

  const updateInput = (field: keyof ROIInputs, value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;

    // Validate and clamp values based on field with realistic business ranges
    let clampedValue = numValue;
    switch (field) {
      case "teamSize":
        clampedValue = Math.max(1, Math.min(50, numValue));
        break;
      case "incidentsPerWeek":
        clampedValue = Math.max(1, Math.min(20, numValue));
        break;
      case "manualHoursPerWeek":
        clampedValue = Math.max(10, Math.min(400, numValue));
        break;
      case "hourlyRate":
        clampedValue = Math.max(20, Math.min(150, numValue));
        break;
      case "incidentCost":
        clampedValue = Math.max(500, Math.min(5000, numValue));
        break;
      case "setupCost":
        clampedValue = Math.max(1000, Math.min(100000, numValue));
        break;
      case "automationEfficiency":
        clampedValue = Math.max(30, Math.min(90, numValue));
        break;
      case "incidentReduction":
        clampedValue = Math.max(40, Math.min(95, numValue));
        break;
    }

    setInputs((prev) => ({ ...prev, [field]: clampedValue }));
  };


  return (
    <section id="roi-calculator" className="py-16 md:py-24 bg-muted dark:bg-[#0B0C10] scroll-mt-24 transition-colors duration-300">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Calculate Your ROI
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
            Estimates based on typical mid-size business data.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much time and money your business could save with automation.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto min-h-[600px]">
          <div className={`relative ${hasCalculated ? 'lg:grid lg:grid-cols-2' : 'flex justify-center'} gap-8 transition-all duration-500 ease-in-out`}>
            {/* Calculator Panel - Centered initially, slides left after calculation */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                layout: {
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                },
                opacity: { duration: 0.5 },
                y: { duration: 0.5 },
              }}
              className={`space-y-6 ${hasCalculated ? 'w-full' : 'w-full max-w-2xl mx-auto'}`}
            >
            <Card className="rounded-lg border border-slate-300 dark:border-gray-800 shadow-sm bg-card transition-colors duration-300">
              <CardContent className="p-6 space-y-6">
                {/* Team Size */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Your Team Size</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.teamSize}</span>
                  </div>
                  <Slider
                    value={[inputs.teamSize]}
                    onValueChange={(value) => updateInput("teamSize", value)}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Incidents per Week */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Problems per Week</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.incidentsPerWeek}</span>
                  </div>
                  <Slider
                    value={[inputs.incidentsPerWeek]}
                    onValueChange={(value) => updateInput("incidentsPerWeek", value)}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Manual Task Hours per Week */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Hours Spent on Repetitive Tasks</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.manualHoursPerWeek}</span>
                  </div>
                  <Slider
                    value={[inputs.manualHoursPerWeek]}
                    onValueChange={(value) => updateInput("manualHoursPerWeek", value)}
                    min={10}
                    max={400}
                    step={5}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Hourly Rate */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Average Hourly Wage</Label>
                  <Input
                    type="number"
                    value={inputs.hourlyRate}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      const clampedValue = Math.max(20, Math.min(150, value));
                      updateInput("hourlyRate", clampedValue);
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value) || 50;
                      const clampedValue = Math.max(20, Math.min(150, value));
                      if (value !== clampedValue) {
                        updateInput("hourlyRate", clampedValue);
                      }
                    }}
                    placeholder="e.g. 50"
                    className="rounded-lg border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:ring-2"
                    min={20}
                    max={150}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">Typical range: $20 - $150</p>
                </div>

                {/* Average Problem Cost */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Average Cost per Problem</Label>
                  <Input
                    type="number"
                    value={inputs.incidentCost}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      const clampedValue = Math.max(500, Math.min(5000, value));
                      updateInput("incidentCost", clampedValue);
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value) || 1500;
                      const clampedValue = Math.max(500, Math.min(5000, value));
                      if (value !== clampedValue) {
                        updateInput("incidentCost", clampedValue);
                      }
                    }}
                    placeholder="e.g. 1000"
                    className="rounded-lg border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:ring-2"
                    min={500}
                    max={5000}
                    step={100}
                  />
                  <p className="text-xs text-muted-foreground">Typical range: $500 - $5,000</p>
                </div>

                {/* Setup Cost */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Initial Setup Investment</Label>
                  <Input
                    type="number"
                    value={inputs.setupCost}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      const clampedValue = Math.max(1000, Math.min(100000, value));
                      updateInput("setupCost", clampedValue);
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value) || 25000;
                      const clampedValue = Math.max(1000, Math.min(100000, value));
                      if (value !== clampedValue) {
                        updateInput("setupCost", clampedValue);
                      }
                    }}
                    placeholder="e.g. 10000"
                    className="rounded-lg border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:ring-2"
                    min={1000}
                    max={100000}
                    step={1000}
                  />
                  <p className="text-xs text-muted-foreground">Typical range: $1,000 - $100,000</p>
                </div>

                {/* Automation Efficiency */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Automation Efficiency (%)</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.automationEfficiency}%</span>
                  </div>
                  <Slider
                    value={[inputs.automationEfficiency]}
                    onValueChange={(value) => updateInput("automationEfficiency", value)}
                    min={30}
                    max={90}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Problem Reduction */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Problem Reduction (%)</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.incidentReduction}%</span>
                  </div>
                  <Slider
                    value={[inputs.incidentReduction]}
                    onValueChange={(value) => updateInput("incidentReduction", value)}
                    min={40}
                    max={95}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Calculate ROI Button */}
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Get a realistic estimate of your time and cost savings with AI automation.
                  </p>
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
                    size="lg"
                    aria-label="Calculate ROI"
                  >
                    Calculate ROI
                  </Button>
                  {!hasCalculated && (
                    <p className="text-muted-foreground text-sm mt-2 text-center">
                      Press Calculate to view your estimated savings.
                    </p>
                  )}
                </div>

              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Outputs - Only render when showResults is true */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{
                  layout: {
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  opacity: {
                    duration: 0.35,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  x: {
                    duration: 0.35,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                className="space-y-6 w-full"
              >
              {/* ROI Context Line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground italic">
                  Typical automation ROI ranges 150–400% annually based on client results.
                </p>
              </motion.div>

              {/* Results Grid */}
              <div id="roi-result" className="grid grid-cols-1 gap-6">
              {/* Manual Work Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card">
                <CardContent className="p-6">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Manual Work Savings ($/yr)
                  </Label>
                  <AnimatedCurrencyValue
                    value={results.manualWorkSavings}
                    className="text-3xl md:text-4xl font-bold text-foreground"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Problem Cost Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card">
                <CardContent className="p-6">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Problem Cost Savings ($/yr)
                  </Label>
                  <AnimatedCurrencyValue
                    value={results.incidentCostSavings}
                    className="text-3xl md:text-4xl font-bold text-foreground"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Annual Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="rounded-lg border-2 border-blue-500/30 dark:border-blue-500/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 bg-card">
                <CardContent className="p-8 text-center">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Total Annual Savings ($/yr)
                  </Label>
                  <AnimatedCurrencyValue
                    value={results.totalAnnualSavings}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* ROI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="rounded-lg border-2 border-blue-500/30 dark:border-blue-500/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 bg-card">
                <CardContent className="p-8 text-center">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    ROI (%)
                  </Label>
                  <AnimatedROIValue
                    value={results.roi}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Payback Period */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card">
                <CardContent className="p-6">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Payback Period (months)
                  </Label>
                  <AnimatedPaybackValue
                    value={results.paybackMonths}
                    className="text-3xl md:text-4xl font-bold text-foreground"
                  />
                </CardContent>
              </Card>
            </motion.div>

              </div>

              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* Calculation Breakdown and Chart - Only show after calculate, appear below */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mt-12 space-y-6"
            >
              {/* Calculation Breakdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="rounded-lg border border-slate-300 dark:border-gray-800 shadow-sm bg-card transition-colors duration-300">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Calculation Breakdown</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Annual Manual Hours:</span>
                        <span className="font-medium text-foreground">
                          {formatNumber(inputs.teamSize * inputs.manualHoursPerWeek * 52)} hours
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manual Savings:</span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(results.manualWorkSavings)}/year
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Problem Savings:</span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(results.incidentCostSavings)}/year
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between text-base">
                          <span className="font-semibold">Total Annual Savings:</span>
                          <span className="font-bold text-foreground">
                            {formatCurrency(results.totalAnnualSavings)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-muted-foreground">
                        <strong>Assumptions:</strong> 52 working weeks per year. Calculations use actual input values without rounding until final display.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* ROI vs Team Size Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
          <Card className="rounded-xl bg-white dark:bg-gray-900/70 dark:backdrop-blur-md shadow-md p-4 mt-6 border border-slate-300 dark:border-gray-800 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-foreground">ROI vs Team Size</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 120, bottom: 10 }}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="teamSize"
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(v: number) => [`${v.toFixed(1)}% ROI`, "ROI"]}
                  labelFormatter={(label) => `Team size: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="roi"
                  stroke="#059669"
                  fill="url(#roiGradient)"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                <ReferenceLine
                  y={400}
                  stroke="#f59e0b"
                  strokeDasharray="3 3"
                  label={{
                    value: "Strong ROI Zone",
                    position: "left",
                    fill: "#f59e0b",
                    fontSize: 13,
                    fontWeight: 600,
                    dy: -5,
                    dx: 10
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="text-muted-foreground text-sm mt-4 text-center">
              ROI estimates based on 2024 McKinsey & Gartner automation benchmarks.
              <br />
              Typical automation ROI: 150%–400% annually depending on process complexity.
            </p>
          </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Animated Currency Value Component
function AnimatedCurrencyValue({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setDisplayValue(0);
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(stepValue * currentStep, value);
      setDisplayValue(newValue);

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.span
      className={className}
      key={value}
      initial={{ scale: 1.1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {formatCurrency(Math.round(displayValue))}
    </motion.span>
  );
}

// Animated ROI Value Component
function AnimatedROIValue({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setDisplayValue(0);
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const stepValue = Math.abs(value) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(stepValue * currentStep, Math.abs(value));
      setDisplayValue(newValue);

      if (currentStep >= steps) {
        setDisplayValue(Math.abs(value));
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const isNegative = value < 0;
  const roundedValue = Math.round(displayValue * 10) / 10;

  return (
    <motion.span
      className={className}
      key={value}
      initial={{ scale: 1.1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isNegative && "-"}
      {roundedValue.toFixed(1)}%
    </motion.span>
  );
}

// Animated Payback Value Component
function AnimatedPaybackValue({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setDisplayValue(0);
    if (value === Infinity || isNaN(value)) {
      setDisplayValue(Infinity);
      return;
    }
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(stepValue * currentStep, value);
      setDisplayValue(newValue);

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const roundedValue = Math.round(displayValue * 10) / 10;
  const paybackText =
    displayValue === Infinity || isNaN(displayValue)
      ? "Never (no savings)"
      : `${roundedValue.toFixed(1)} months`;

  return (
    <motion.span
      className={className}
      key={value}
      initial={{ scale: 1.1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {paybackText}
    </motion.span>
  );
}
