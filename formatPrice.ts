/** Keep editorial labels, but always show the currency for monetary amounts. */
export const formatPrice = (price: string | number): string => {
  const value = String(price).trim();
  if (/^€/.test(value)) return value.replace(/^€\s*/, '€');
  if (/^\d[\d.,]*(?:\s*(?:\/.*|per\s+.*))?$/i.test(value)) return `€${value}`;
  return value;
};
