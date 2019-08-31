// eslint-disable-next-line import/prefer-default-export
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

const formatPrice = (stringPrice, currency) => {
  const formatter = new Intl.NumberFormat(navigator.language, { // > IE 11
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(stringPrice); // "$1,000.00"
};

export const formatEventPriceRange = (minPrice, maxPrice, currency) => ` ${formatPrice(minPrice, currency)} - ${formatPrice(minPrice, currency)}`;
export const formatEventDateRange = (startTime, endTime, pattern) => `${format(new Date(startTime), pattern)} -  ${format(new Date(endTime), pattern)} `;

export const formatReadableEventStartDate = (startTime) => distanceInWordsToNow(
  new Date(startTime), { addSuffix: true },
);
