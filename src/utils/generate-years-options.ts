import dayjs from 'dayjs';

import { SelectItem } from '@/types';

export const generateYearsOptions = (startYear: number): SelectItem[] => {
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
