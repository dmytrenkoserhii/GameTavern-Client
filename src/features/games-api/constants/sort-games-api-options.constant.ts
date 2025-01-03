import { t } from 'i18next';

import { SelectItem } from '@/types';

export const SORT_GAMES_API_OPTIONS: SelectItem[] = [
  { value: 'name:asc', label: t('games_api.sort_options.name_asc') },
  { value: 'name:desc', label: t('games_api.sort_options.name_desc') },
  { value: 'original_release_date:asc', label: t('games_api.sort_options.release_date_newest') },
  { value: 'original_release_date:desc', label: t('games_api.sort_options.release_date_oldest') },
];
