/**
 * Validate email address
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password) => {
  // At least 6 characters, contains letter and number
  return password.length >= 6;
};

/**
 * Validate phone number (US format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate currency amount
 */
export const isValidAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0;
};

/**
 * Validate interest rate
 */
export const isValidInterestRate = (rate) => {
  const num = parseFloat(rate);
  return !isNaN(num) && num >= 0 && num <= 100;
};

/**
 * Validate date is in future
 */
export const isFutureDate = (date) => {
  return new Date(date) >= new Date();
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500); // Limit length
};
