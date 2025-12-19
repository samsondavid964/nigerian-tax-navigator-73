import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Percent, Calendar, Wallet, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaxBreakdown, TaxInput, formatCurrency, generateTaxExplanation } from '@/lib/taxCalculator';

interface TaxResultCardProps {
  input: TaxInput;
  breakdown: TaxBreakdown;
  onBack: () => void;
  onRecalculate: () => void;
}

export function TaxResultCard({ input, breakdown, onBack, onRecalculate }: TaxResultCardProps) {
  const explanation = generateTaxExplanation(input, breakdown);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Calculator</span>
        </motion.button>

        {/* Result Card - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="glass-card-strong rounded-3xl overflow-hidden forest-glow"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-forest-light p-8 text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm font-medium opacity-80 mb-2">Your Tax Report</p>
              <h2 className="text-3xl sm:text-4xl font-bold">2025 Tax Assessment</h2>
            </motion.div>
          </div>

          <div className="p-8 space-y-8">
            {/* Big Figures */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Annual Tax */}
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">Annual Tax</span>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {formatCurrency(breakdown.totalAnnualTax)}
                </p>
              </div>

              {/* Monthly Tax */}
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">Monthly Tax</span>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {formatCurrency(breakdown.monthlyTax)}
                </p>
              </div>
            </motion.div>

            {/* Effective Tax Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-accent/10 border border-accent/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-accent/20">
                    <Percent className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Effective Tax Rate</p>
                    <p className="text-2xl font-bold text-foreground">{breakdown.effectiveTaxRate.toFixed(2)}%</p>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-accent opacity-50" />
              </div>
            </motion.div>

            {/* Tax Band Breakdown */}
            {breakdown.taxBandBreakdown.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-foreground">Tax Band Breakdown</h3>
                <div className="space-y-3">
                  {breakdown.taxBandBreakdown.map((band, index) => (
                    <motion.div
                      key={band.band}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{band.band}</p>
                        <p className="text-xs text-muted-foreground">
                          Taxable: {formatCurrency(band.taxableAmount)}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(band.taxAmount)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Deductions Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border/50"
            >
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Gross Income</p>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(breakdown.annualGross)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Rent Relief</p>
                <p className="text-sm font-semibold text-primary">{formatCurrency(breakdown.rentRelief)}</p>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <p className="text-xs text-muted-foreground mb-1">Pension Deduction</p>
                <p className="text-sm font-semibold text-primary">{formatCurrency(breakdown.pensionDeduction)}</p>
              </div>
            </motion.div>

            {/* The Why - Dynamic Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="p-6 rounded-2xl bg-muted/50 border border-border/50"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Understanding Your Tax</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
                </div>
              </div>
            </motion.div>

            {/* Recalculate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Button
                onClick={onRecalculate}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-forest-light text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Calculate Again
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
