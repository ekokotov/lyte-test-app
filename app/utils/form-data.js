import fromPairs from 'lodash/fromPairs';

export const getFormValues = (form) => {
  const fmData = new FormData(form);
  const data = fmData.entries();
  const values = {};

  for (const inputData of data) {
    Object.assign(values, fromPairs([inputData])); // aka Object.fromEntries
  }
  return values;
};
