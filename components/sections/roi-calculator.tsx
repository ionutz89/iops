"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { calculateROI, formatCurrency, type ROIInputs } from "@/lib/roi-calculations";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    teamSize: 5,
    incidentsPerWeek: 5,
    manualHoursPerWeek: 80,
    hourlyRate: 85,
    incidentCost: 4000,
    setupCost: 40000,
    automationEfficiency: 65,
    incidentReduction: 80,
  });

  const [showChart, setShowChart] = useState(false);

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  // Generate chart data for ROI vs Team Size
  const chartData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const teamSize = i + 1;
      const chartInputs: ROIInputs = {
        ...inputs,
        teamSize,
      };
      const chartResults = calculateROI(chartInputs);
      return {
        teamSize,
        roi: Math.min(chartResults.roi, 999),
      };
    });
  }, [inputs]);

  const updateInput = (field: keyof ROIInputs, value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    setShowChart(true);
  };

  return (
    <section id="roi-calculator" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-24">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Calculate Your ROI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much time and money your business could save with AI-powered operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm bg-card">
              <CardContent className="p-6 space-y-6">
                {/* Team Size */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Team Size</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.teamSize}</span>
                  </div>
                  <Slider
                    value={[inputs.teamSize]}
                    onValueChange={(value) => updateInput("teamSize", value)}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Incidents per Week */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Incidents per Week</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.incidentsPerWeek}</span>
                  </div>
                  <Slider
                    value={[inputs.incidentsPerWeek]}
                    onValueChange={(value) => updateInput("incidentsPerWeek", value)}
                    min={0}
                    max={20}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Manual Task Hours per Week */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Manual Task Hours per Week</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.manualHoursPerWeek}</span>
                  </div>
                  <Slider
                    value={[inputs.manualHoursPerWeek]}
                    onValueChange={(value) => updateInput("manualHoursPerWeek", value)}
                    min={10}
                    max={200}
                    step={5}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Hourly Rate */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Hourly Rate ($)</Label>
                  <Input
                    type="number"
                    value={inputs.hourlyRate}
                    onChange={(e) => updateInput("hourlyRate", parseFloat(e.target.value) || 0)}
                    className="rounded-lg border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:ring-2"
                    min={0}
                    step={1}
                  />
                </div>

                {/* Average Incident Cost */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Average Incident Cost ($)</Label>
                  <Input
                    type="number"
                    value={inputs.incidentCost}
                    onChange={(e) => updateInput("incidentCost", parseFloat(e.target.value) || 0)}
                    className="rounded-lg border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:ring-2"
                    min={0}
                    step={100}
                  />
                </div>

                {/* Setup Cost */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Setup Cost ($)</Label>
                  <Input
                    type="number"
                    value={inputs.setupCost}
                    onChange={(e) => updateInput("setupCost", parseFloat(e.target.value) || 0)}
                    className="rounded-lg border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:ring-2"
                    min={0}
                    step={1000}
                  />
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
                    min={40}
                    max={80}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Incident Reduction */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Incident Reduction (%)</Label>
                    <span className="text-sm font-semibold text-foreground">{inputs.incidentReduction}%</span>
                  </div>
                  <Slider
                    value={[inputs.incidentReduction]}
                    onValueChange={(value) => updateInput("incidentReduction", value)}
                    min={50}
                    max={90}
                    step={1}
                    className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                  />
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 hover:from-blue-600 hover:to-purple-700 mt-6"
                >
                  Calculate ROI
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
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

            {/* Incident Cost Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card">
                <CardContent className="p-6">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Incident Cost Savings ($/yr)
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

            {/* Assumptions Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-muted-foreground space-y-2"
            >
              <p>
                <strong>Assumptions:</strong> 52 working weeks, automation efficiency and incident reduction are adjustable.
              </p>
              <p>Adjust sliders to see how results change.</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ROI vs Team Size Chart */}
        {showChart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm bg-card p-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">ROI vs Team Size</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="teamSize"
                    stroke="#64748b"
                    label={{ value: "Team Size", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "ROI"]}
                    labelFormatter={(label) => `Team Size: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="roi"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}
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
    const cappedValue = Math.min(Math.abs(value), 999);
    const stepValue = cappedValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(stepValue * currentStep, cappedValue);
      setDisplayValue(newValue);

      if (currentStep >= steps) {
        setDisplayValue(cappedValue);
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
    if (value === Infinity) {
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
    displayValue === Infinity
      ? "Never"
      : roundedValue < 1
      ? "<1 month"
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
