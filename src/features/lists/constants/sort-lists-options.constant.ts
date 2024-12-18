import { t } from 'i18next';

import { SelectItem } from '@/types';

export const SORT_LISTS_OPTIONS: SelectItem[] = [
  { value: 'createdAt:asc', label: t('lists.sort_options.lists.newest') },
  { value: 'createdAt:desc', label: t('lists.sort_options.lists.oldest') },
];
