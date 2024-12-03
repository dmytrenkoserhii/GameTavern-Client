export const removeObjectEmptyProperties = <T>(data: T) => {
  const cleanedData = { ...data };

  for (const param in cleanedData) {
    if (!cleanedData[param as keyof typeof cleanedData]) {
      delete cleanedData[param as keyof typeof cleanedData];
    }
  }

  return cleanedData;
};
