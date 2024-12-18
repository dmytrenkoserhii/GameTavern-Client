import { t } from 'i18next';

import { FaList, FaTh } from 'react-icons/fa';

import { SelectItemWithIcon } from '../types';

export const DISPLAY_OPTIONS: SelectItemWithIcon[] = [
  { value: 'card', label: t('lists.display_mode_selector.grid'), icon: FaTh },
  { value: 'list', label: t('lists.display_mode_selector.list'), icon: FaList },
];
