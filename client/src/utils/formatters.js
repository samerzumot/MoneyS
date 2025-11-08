/**
 * Format currency amount
 */
export const formatCurrency = (amount, options = {}) => {
  const { 
    minimumFractionDigits = 0, 
    maximumFractionDigits = 2,
    currency = 'USD'
  } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  return d.toLocaleDateString();
};

/**
 * Calculate days until date
 */
export const daysUntil = (date) => {
  const today = new Date();
  const target = new Date(date);
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Format percentage
 */
export const formatPercent = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  
  return formatDate(date, 'short');
};
