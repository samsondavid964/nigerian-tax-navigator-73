// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export const trackEvent = (
  eventName: string,
  params?: EventParams
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Pre-defined events for the tax calculator
export const analytics = {
  // Welcome page events
  getStartedClick: () => trackEvent('get_started_click', {
    event_category: 'engagement',
    event_label: 'Welcome Hero'
  }),

  // Form events
  formSubmit: (incomePeriod: string, employmentStatus: string) => trackEvent('calculate_tax', {
    event_category: 'form',
    income_period: incomePeriod,
    employment_status: employmentStatus
  }),

  // Result events
  resultView: (effectiveTaxRate: number, totalTax: number) => trackEvent('view_results', {
    event_category: 'engagement',
    effective_tax_rate: effectiveTaxRate,
    total_tax_bracket: totalTax > 1000000 ? 'high' : totalTax > 100000 ? 'medium' : 'low'
  }),

  calculateAgain: () => trackEvent('calculate_again', {
    event_category: 'engagement',
    event_label: 'Results Page'
  }),

  // External link clicks
  linkedInClick: () => trackEvent('linkedin_click', {
    event_category: 'outbound',
    event_label: 'Footer'
  })
};
