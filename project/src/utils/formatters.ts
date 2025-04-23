// Format price to currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format order ID
export const formatOrderId = (id: number): string => {
  return `#${id.toString().padStart(4, '0')}`;
};

// Calculate tax amount based on subtotal
export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.0825; // 8.25% tax rate
};

// Calculate total with tax
export const calculateTotal = (subtotal: number): number => {
  return subtotal + calculateTax(subtotal);
};

// Format date and time
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};