import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomeHero } from '@/components/WelcomeHero';
import { TaxCalculatorForm } from '@/components/TaxCalculatorForm';
import { TaxResultCard } from '@/components/TaxResultCard';
import { Footer } from '@/components/Footer';
import { calculateTax, TaxInput, TaxBreakdown } from '@/lib/taxCalculator';

type ViewState = 'welcome' | 'calculator' | 'results';

const Index = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [taxInput, setTaxInput] = useState<TaxInput | null>(null);
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown | null>(null);

  const handleGetStarted = () => {
    setView('calculator');
  };

  const handleCalculate = (input: TaxInput) => {
    const breakdown = calculateTax(input);
    setTaxInput(input);
    setTaxBreakdown(breakdown);
    setView('results');
  };

  const handleBackToCalculator = () => {
    setView('calculator');
  };

  const handleBackToWelcome = () => {
    setView('welcome');
  };

  const handleRecalculate = () => {
    setView('calculator');
  };

  return (
    <main className="relative min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {view === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeHero onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {view === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <TaxCalculatorForm
              onBack={handleBackToWelcome}
              onCalculate={handleCalculate}
            />
          </motion.div>
        )}

        {view === 'results' && taxInput && taxBreakdown && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <TaxResultCard
              input={taxInput}
              breakdown={taxBreakdown}
              onBack={handleBackToCalculator}
              onRecalculate={handleRecalculate}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Index;
