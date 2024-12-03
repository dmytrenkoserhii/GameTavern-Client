import { t } from 'i18next';

import { SelectItem } from '@/types';

export const SORT_LISTS_OPTIONS: SelectItem[] = [
  { value: 'newest', label: t('lists.sort_options.lists.newest') },
  { value: 'oldest', label: t('lists.sort_options.lists.oldest') },
];
