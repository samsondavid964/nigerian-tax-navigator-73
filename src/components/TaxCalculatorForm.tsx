import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Briefcase, User, Home, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { TaxInput } from '@/lib/taxCalculator';

interface TaxCalculatorFormProps {
  onBack: () => void;
  onCalculate: (input: TaxInput) => void;
}

export function TaxCalculatorForm({ onBack, onCalculate }: TaxCalculatorFormProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const [isSalaryEarner, setIsSalaryEarner] = useState(true);
  const [grossIncome, setGrossIncome] = useState('');
  const [annualRent, setAnnualRent] = useState('');
  const [hasPension, setHasPension] = useState(true);

  // Auto-check pension when switching to salary earner
  const handleEmploymentChange = (checked: boolean) => {
    setIsSalaryEarner(checked);
    if (checked) {
      setHasPension(true);
    }
  };

  const formatInputValue = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Format with commas
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseInputValue = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCalculate({
      grossIncome: parseInputValue(grossIncome),
      annualRent: parseInputValue(annualRent),
      isMonthly,
      isSalaryEarner,
      hasPension,
    });
  };

  const isValid = parseInputValue(grossIncome) > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
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
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="glass-card-strong rounded-2xl p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Tax Calculator</h2>
            <p className="text-muted-foreground">Enter your income details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Income Period Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <Label className="text-sm font-medium text-foreground">Income Period</Label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50">
                <span className={`text-sm font-medium transition-colors ${!isMonthly ? 'text-primary' : 'text-muted-foreground'}`}>
                  Annual
                </span>
                <Switch
                  checked={isMonthly}
                  onCheckedChange={setIsMonthly}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={`text-sm font-medium transition-colors ${isMonthly ? 'text-primary' : 'text-muted-foreground'}`}>
                  Monthly
                </span>
              </div>
            </motion.div>

            {/* Employment Status Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-3"
            >
              <Label className="text-sm font-medium text-foreground">Employment Status</Label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-sm font-medium transition-colors ${!isSalaryEarner ? 'text-primary' : 'text-muted-foreground'}`}>
                    Freelancer
                  </span>
                </div>
                <Switch
                  checked={isSalaryEarner}
                  onCheckedChange={handleEmploymentChange}
                  className="data-[state=checked]:bg-primary"
                />
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-sm font-medium transition-colors ${isSalaryEarner ? 'text-primary' : 'text-muted-foreground'}`}>
                    Salary Earner
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Gross Income */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <Label htmlFor="grossIncome" className="text-sm font-medium text-foreground">
                Gross Income ({isMonthly ? 'Monthly' : 'Annual'})
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  ₦
                </span>
                <Input
                  id="grossIncome"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(formatInputValue(e.target.value))}
                  className="pl-8 h-14 text-lg bg-background border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                />
              </div>
            </motion.div>

            {/* Annual Rent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-3"
            >
              <Label htmlFor="annualRent" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                Rent Paid ({isMonthly ? 'Monthly' : 'Annual'})
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  ₦
                </span>
                <Input
                  id="annualRent"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={annualRent}
                  onChange={(e) => setAnnualRent(formatInputValue(e.target.value))}
                  className="pl-8 h-14 text-lg bg-background border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                />
              </div>
            </motion.div>

            {/* Pension Checkbox */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50"
            >
              <Checkbox
                id="pension"
                checked={hasPension}
                onCheckedChange={(checked) => setHasPension(checked as boolean)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="pension" className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
                <PiggyBank className="w-4 h-4 text-accent" />
                Pension Contribution (8% deduction)
              </Label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Button
                type="submit"
                disabled={!isValid}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-forest-light text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Tax
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
