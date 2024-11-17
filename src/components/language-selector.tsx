import { LANGUAGES } from '@/constants';
import { Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.resolvedLanguage}
      onChange={(value) => value && i18n.changeLanguage(value)}
      data={LANGUAGES.map((lng) => ({
        value: lng.key,
        label: lng.value,
      }))}
      w={85}
    />
  );
};
