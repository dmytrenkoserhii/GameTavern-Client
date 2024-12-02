import { t } from 'i18next';

import { SortOption } from '@/types';

export const SORT_LISTS_OPTIONS: SortOption[] = [
  { value: 'newest', label: t('sort_options.newest') },
  { value: 'oldest', label: t('sort_options.oldest') },
];
