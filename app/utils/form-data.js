export const getFormValues = (form) => {
  const fmData = new FormData(form);
  const data = fmData.entries();
  const retrieved = {};

  for (const inputData of data) {
    Object.assign(retrieved, Object.fromEntries([inputData]));
  }
  return retrieved;
};
