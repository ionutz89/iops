export interface ROIInputs {
  teamSize: number;
  incidentsPerWeek: number;
  manualHoursPerWeek: number;
  hourlyRate: number;
  incidentCost: number;
  setupCost: number;
  automationEfficiency: number; // Percentage (30-90)
  incidentReduction: number; // Percentage (40-95)
}

export interface ROIResults {
  manualWorkSavings: number;
  incidentCostSavings: number;
  totalAnnualSavings: number;
  roi: number;
  paybackMonths: number;
}

const WEEKS_PER_YEAR = 52;

export function calculateROI(inputs: ROIInputs): ROIResults {
  const {
    teamSize,
    incidentsPerWeek,
    manualHoursPerWeek,
    hourlyRate,
    incidentCost,
    automationEfficiency,
    incidentReduction,
  } = inputs;

  // Calculate annual manual hours: teamSize * manualHoursPerWeek * WEEKS_PER_YEAR
  const annualManualHours = teamSize * manualHoursPerWeek * WEEKS_PER_YEAR;

  // Calculate manual savings: annualManualHours * hourlyRate * (automationEfficiency / 100)
  const manualSavings = annualManualHours * hourlyRate * (automationEfficiency / 100);

  // Calculate incident savings: incidentsPerWeek * incidentCost * WEEKS_PER_YEAR * (incidentReduction / 100)
  const incidentSavings = incidentsPerWeek * incidentCost * WEEKS_PER_YEAR * (incidentReduction / 100);

  // Total annual savings
  const totalSavings = manualSavings + incidentSavings;

  const setupCost = Math.min(Math.max(Number(inputs.setupCost) || 100000, 25000), 200000);

  const roi = Math.min(((totalSavings - setupCost) / setupCost) * 100, 600);

  const paybackMonths = Math.max(setupCost / (totalSavings / 12), 1);

  return {
    manualWorkSavings: Math.round(manualSavings),
    incidentCostSavings: Math.round(incidentSavings),
    totalAnnualSavings: Math.round(totalSavings),
    roi: Math.round(roi * 10) / 10, // Round to one decimal
    paybackMonths: paybackMonths === Infinity ? Infinity : Math.round(paybackMonths * 10) / 10, // Round to one decimal, minimum 0.1
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

