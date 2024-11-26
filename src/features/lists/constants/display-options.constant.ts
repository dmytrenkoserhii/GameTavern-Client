import { t } from 'i18next';

import { FaList, FaTh } from 'react-icons/fa';

export const displayOptions = [
  { value: 'card', label: t('lists.display_mode_selector.grid'), icon: FaTh },
  { value: 'list', label: t('lists.display_mode_selector.list'), icon: FaList },
];
