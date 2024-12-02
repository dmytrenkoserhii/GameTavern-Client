import { t } from 'i18next';

import { SortOption } from '@/types';

export const SORT_GAMES_OPTIONS: SortOption[] = [
  { value: 'user_order', label: t('sort_options.user_order') },
  { value: 'game_title', label: t('sort_options.game_title') },
  { value: 'release_date', label: t('sort_options.release_date') },
];
