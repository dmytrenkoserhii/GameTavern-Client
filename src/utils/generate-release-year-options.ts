import dayjs from 'dayjs';

export const GenerateReleaseYearOptions = (startYear: number) => {
  const currentYear = dayjs().year();
  const releaseYearOptions = [];

  for (let i = startYear; i <= currentYear; i++) {
    const yearOption = {
      value: String(i),
      label: String(i),
    };
    releaseYearOptions.unshift(yearOption);
  }

  return releaseYearOptions;
};
