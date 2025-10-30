export interface ROIInputs {
  teamSize: number;
  incidentsPerWeek: number;
  manualHoursPerWeek: number;
  hourlyRate: number;
  incidentCost: number;
  setupCost: number;
  automationEfficiency: number; // Percentage (40-80)
  incidentReduction: number; // Percentage (50-90)
}

export interface ROIResults {
  manualWorkSavings: number;
  incidentCostSavings: number;
  totalAnnualSavings: number;
  roi: number;
  paybackMonths: number;
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const {
    teamSize,
    incidentsPerWeek,
    manualHoursPerWeek,
    hourlyRate,
    incidentCost,
    setupCost,
    automationEfficiency,
    incidentReduction,
  } = inputs;

  // Convert percentages to decimals
  const timeSaved = automationEfficiency / 100;
  const incidentReductionRate = incidentReduction / 100;

  // Calculate manual work savings
  // Formula: teamSize * hoursWeek * 52 * hourlyRate * timeSaved
  const manualSavings = teamSize * manualHoursPerWeek * 52 * hourlyRate * timeSaved;

  // Calculate incident cost savings
  // Formula: incidentsWeek * 52 * incidentCost * incidentReduction
  const incidentSavings = incidentsPerWeek * 52 * incidentCost * incidentReductionRate;

  // Total annual savings
  const totalSavings = manualSavings + incidentSavings;

  // ROI calculation: ((totalSavings - setupCost) / setupCost) * 100
  const roi = totalSavings > 0 ? ((totalSavings - setupCost) / setupCost) * 100 : 0;

  // Payback period in months: setupCost / (totalSavings / 12)
  const payback = totalSavings > 0 ? setupCost / (totalSavings / 12) : Infinity;

  return {
    manualWorkSavings: Math.round(manualSavings / 1000) * 1000, // Round to nearest $1,000
    incidentCostSavings: Math.round(incidentSavings / 1000) * 1000, // Round to nearest $1,000
    totalAnnualSavings: Math.round(totalSavings / 1000) * 1000, // Round to nearest $1,000
    roi: Math.min(Math.round(roi * 10) / 10, 999), // Round to one decimal, cap at 999%
    paybackMonths: payback === Infinity ? Infinity : Math.round(payback * 10) / 10, // Round to one decimal
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

