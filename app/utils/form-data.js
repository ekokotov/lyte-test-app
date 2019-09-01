export const getFormValues = (form) => {
  const fmData = new FormData(form);
  const data = fmData.entries();
  const values = {};

  for (const inputData of data) {
    Object.assign(values, Object.fromEntries([inputData]));
  }
  return values;
};
