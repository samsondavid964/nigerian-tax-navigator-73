/**
 * Nigerian Tax Calculator (2025 Reform Edition)
 * Implements the Nigeria Tax Act 2025 progressive tax bands
 */

export interface TaxInput {
  grossIncome: number;
  annualRent: number;
  isMonthly: boolean;
  isSalaryEarner: boolean;
  hasPension: boolean;
}

export interface TaxBreakdown {
  annualGross: number;
  rentRelief: number;
  pensionDeduction: number;
  chargeableIncome: number;
  totalAnnualTax: number;
  monthlyTax: number;
  effectiveTaxRate: number;
  taxBandBreakdown: TaxBandResult[];
}

export interface TaxBandResult {
  band: string;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

// 2025 Nigeria Tax Bands
const TAX_BANDS = [
  { min: 0, max: 800_000, rate: 0, label: 'First ₦800,000 (Tax Free)' },
  { min: 800_000, max: 3_000_000, rate: 0.15, label: 'Next ₦2,200,000 (15%)' },
  { min: 3_000_000, max: 12_000_000, rate: 0.18, label: 'Next ₦9,000,000 (18%)' },
  { min: 12_000_000, max: 25_000_000, rate: 0.21, label: 'Next ₦13,000,000 (21%)' },
  { min: 25_000_000, max: 50_000_000, rate: 0.23, label: 'Next ₦25,000,000 (23%)' },
  { min: 50_000_000, max: Infinity, rate: 0.25, label: 'Above ₦50,000,000 (25%)' },
];

const RENT_RELIEF_RATE = 0.20;
const RENT_RELIEF_CAP = 500_000;
const PENSION_RATE = 0.08;

export function calculateTax(input: TaxInput): TaxBreakdown {
  // Step A: Normalization
  const annualGross = input.isMonthly ? input.grossIncome * 12 : input.grossIncome;
  const annualRent = input.isMonthly ? input.annualRent * 12 : input.annualRent;

  // Step B: Calculate Taxable Income
  // Rent Relief: 20% of annual rent, capped at ₦500,000
  const rentRelief = Math.min(annualRent * RENT_RELIEF_RATE, RENT_RELIEF_CAP);

  // Pension Deduction: 8% of annual gross if applicable
  const pensionDeduction = input.hasPension ? annualGross * PENSION_RATE : 0;

  // Chargeable Income (minimum 0)
  const chargeableIncome = Math.max(0, annualGross - rentRelief - pensionDeduction);

  // Step C: Apply Tax Bands
  const taxBandBreakdown: TaxBandResult[] = [];
  let remainingIncome = chargeableIncome;
  let totalAnnualTax = 0;

  for (const band of TAX_BANDS) {
    if (remainingIncome <= 0) break;

    const bandWidth = band.max - band.min;
    const taxableInBand = Math.min(remainingIncome, bandWidth);
    const taxForBand = taxableInBand * band.rate;

    if (taxableInBand > 0) {
      taxBandBreakdown.push({
        band: band.label,
        rate: band.rate * 100,
        taxableAmount: taxableInBand,
        taxAmount: taxForBand,
      });
    }

    totalAnnualTax += taxForBand;
    remainingIncome -= taxableInBand;
  }

  // Calculate monthly tax and effective rate
  const monthlyTax = totalAnnualTax / 12;
  const effectiveTaxRate = annualGross > 0 ? (totalAnnualTax / annualGross) * 100 : 0;

  return {
    annualGross,
    rentRelief,
    pensionDeduction,
    chargeableIncome,
    totalAnnualTax,
    monthlyTax,
    effectiveTaxRate,
    taxBandBreakdown,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

export function generateTaxExplanation(input: TaxInput, breakdown: TaxBreakdown): string {
  const { annualGross, rentRelief, pensionDeduction, chargeableIncome, totalAnnualTax } = breakdown;
  
  if (totalAnnualTax === 0) {
    return `Great news! Based on your gross income of ${formatCurrency(annualGross)}, after applying all eligible reliefs, your chargeable income of ${formatCurrency(chargeableIncome)} falls entirely within the tax-free band. You owe ₦0 in taxes for 2025.`;
  }

  let explanation = `Based on your gross income of ${formatCurrency(annualGross)}`;
  
  const deductions: string[] = [];
  if (rentRelief > 0) {
    deductions.push(`${formatCurrency(rentRelief)} for rent relief`);
  }
  if (pensionDeduction > 0) {
    deductions.push(`${formatCurrency(pensionDeduction)} for pension contributions`);
  }
  
  if (deductions.length > 0) {
    explanation += `, we deducted ${deductions.join(' and ')}`;
  }
  
  explanation += `. Your first ₦800,000 was tax-free. `;
  
  if (chargeableIncome > 800_000) {
    explanation += `The remaining ${formatCurrency(chargeableIncome - 800_000)} was taxed progressively across the 2025 tax bands, `;
    explanation += `resulting in an effective tax rate of ${breakdown.effectiveTaxRate.toFixed(1)}%.`;
  }
  
  return explanation;
}
