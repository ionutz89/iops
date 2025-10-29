"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { calculateROI, formatCurrency, formatNumber, type ROIInputs } from "@/lib/roi-calculations";
import { TrendingUp, Clock, DollarSign, Zap } from "lucide-react";

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    teamSize: 5,
    incidentsPerWeek: 5,
    manualHoursPerWeek: 80,
  });

  const [results, setResults] = useState(calculateROI(inputs));

  useEffect(() => {
    setResults(calculateROI(inputs));
  }, [inputs]);

  const updateInput = (field: keyof ROIInputs, value: number[]) => {
    setInputs((prev) => ({ ...prev, [field]: value[0] }));
  };

  return (
    <section id="roi-calculator" className="py-24 md:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much you could save with AI-powered automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Current Situation</CardTitle>
                <CardDescription>
                  Adjust the sliders to match your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border">
                  💡 These are default estimates. Adjust to match your setup for accurate results.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>DevOps Team Size</Label>
                    <Badge variant="secondary">{inputs.teamSize} engineers</Badge>
                  </div>
                  <Slider
                    value={[inputs.teamSize]}
                    onValueChange={(value) => updateInput("teamSize", value)}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Incidents Per Week</Label>
                    <Badge variant="secondary">{inputs.incidentsPerWeek} incidents</Badge>
                  </div>
                  <Slider
                    value={[inputs.incidentsPerWeek]}
                    onValueChange={(value) => updateInput("incidentsPerWeek", value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Manual Task Hours/Week</Label>
                    <Badge variant="secondary">{inputs.manualHoursPerWeek} hours</Badge>
                  </div>
                  <Slider
                    value={[inputs.manualHoursPerWeek]}
                    onValueChange={(value) => updateInput("manualHoursPerWeek", value)}
                    min={10}
                    max={160}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="pt-4 text-xs text-muted-foreground border-t">
                  <p className="mb-2">Calculation methodology:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Average DevOps hourly rate: $70/hr</li>
                    <li>Average incident cost: $5,000</li>
                    <li>Time saved: 70% of manual hours</li>
                    <li>Incident reduction: 90%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Annual Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={results.annualSavings}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-4xl md:text-5xl font-bold gradient-text"
                >
                  {formatCurrency(results.annualSavings)}
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">
                  Combined time and incident cost savings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Return on Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={results.roi}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  {results.roi}%
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">
                  Setup cost: {formatCurrency(results.setupCost)}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Payback Period
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {results.paybackMonths} months
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Time Saved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(results.timeSavedHours)} hrs/yr
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Impressive Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Your organization could reduce {formatNumber(results.incidentReduction)} incidents
                      annually and reclaim {formatNumber(results.timeSavedHours)} hours for strategic work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

