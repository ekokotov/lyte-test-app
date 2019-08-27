// eslint-disable-next-line import/prefer-default-export
export const formatPrice = (stringPrice, currency) => {
  const formatter = new Intl.NumberFormat(navigator.language, { // > IE 11
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(stringPrice); // "$1,000.00"
};
