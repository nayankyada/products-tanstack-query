// A function that calculates the discounted price of a product
export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): string => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = (originalPrice - discountAmount).toFixed(2);
  return discountedPrice;
};
