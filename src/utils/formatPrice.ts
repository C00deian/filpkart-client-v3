export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)

export const formatDiscount = (original: number, discounted: number): number =>
  Math.round(((original - discounted) / original) * 100)