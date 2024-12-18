import { FaList, FaTh } from 'react-icons/fa';

import { SelectItemWithIcon } from '@/types';

export const DISPLAY_OPTIONS: SelectItemWithIcon[] = [
  { value: 'card', label: 'lists.display_mode_selector.grid', icon: FaTh },
  { value: 'list', label: 'lists.display_mode_selector.list', icon: FaList },
];
