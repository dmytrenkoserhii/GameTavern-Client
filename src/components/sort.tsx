import { Select } from '@mantine/core';

import { SortOption } from '@/types';

interface SortProps<T extends string> {
  options: SortOption[];
  value: T;
  onSortChange: (value: T) => void;
}

export const Sort = <T extends string>({ options, value, onSortChange }: SortProps<T>) => {
  return (
    <Select
      data={options}
      value={value}
      onChange={(newValue) => newValue && onSortChange(newValue as T)}
      placeholder={options[0].label}
    />
  );
};
