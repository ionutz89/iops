export interface ROIInputs {
  teamSize: number;
  incidentsPerWeek: number;
  manualHoursPerWeek: number;
}

export interface ROIResults {
  annualSavings: number;
  setupCost: number;
  roi: number;
  paybackMonths: number;
  timeSavedHours: number;
  incidentReduction: number;
}

// Industry benchmarks and constants
const AVG_DEVOPS_HOURLY_RATE = 70; // $140K annual salary / 2000 hours
const AVG_INCIDENT_COST = 5000; // Average cost per incident
const TIME_SAVED_PERCENTAGE = 0.7; // 70% time savings claim
const INCIDENT_REDUCTION_PERCENTAGE = 0.9; // 90% incident reduction
const WEEKS_PER_YEAR = 52;
const BASE_SETUP_COST = 30000;

export function calculateROI(inputs: ROIInputs): ROIResults {
  const { teamSize, incidentsPerWeek, manualHoursPerWeek } = inputs;

  // Calculate time savings
  const annualManualHours = manualHoursPerWeek * WEEKS_PER_YEAR;
  const hoursSaved = annualManualHours * TIME_SAVED_PERCENTAGE;
  const timeSavingsDollars = hoursSaved * AVG_DEVOPS_HOURLY_RATE;

  // Calculate incident reduction savings
  const annualIncidents = incidentsPerWeek * WEEKS_PER_YEAR;
  const incidentsReduced = annualIncidents * INCIDENT_REDUCTION_PERCENTAGE;
  const incidentSavings = incidentsReduced * AVG_INCIDENT_COST;

  // Total annual savings
  const annualSavings = timeSavingsDollars + incidentSavings;

  // Setup cost scales with team size (complexity)
  const setupCost = BASE_SETUP_COST + (teamSize > 10 ? (teamSize - 10) * 2000 : 0);

  // ROI calculation
  const roi = ((annualSavings - setupCost) / setupCost) * 100;

  // Payback period in months
  const monthlySavings = annualSavings / 12;
  const paybackMonths = setupCost / monthlySavings;

  return {
    annualSavings: Math.round(annualSavings),
    setupCost: Math.round(setupCost),
    roi: Math.round(roi),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    timeSavedHours: Math.round(hoursSaved),
    incidentReduction: Math.round(incidentsReduced),
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

