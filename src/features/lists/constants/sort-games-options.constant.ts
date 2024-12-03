import { t } from 'i18next';

import { SelectItem } from '@/types';

export const SORT_GAMES_OPTIONS: SelectItem[] = [
  { value: 'user_order', label: t('lists.sort_options.list_games.custom_order') },
  { value: 'game_title', label: t('lists.sort_options.list_games.game_title') },
  { value: 'release_date', label: t('lists.sort_options.list_games.release_date') },
];
