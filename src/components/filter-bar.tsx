import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Drawer, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

import { GenerateReleaseYearOptions } from '@/utils';

interface FilterBarData {
  releaseYear: string;
}

interface FilterBarProps {
  queryParams: { [key: string]: string };
  onFilterChange: (data: FilterBarData) => void;
}

const RELEASE_YEAR_OPTIONS = GenerateReleaseYearOptions(2010);

export const FilterBar: React.FC<FilterBarProps> = ({ queryParams, onFilterChange }) => {
  const { t } = useTranslation();

  const form = useForm<FilterBarData>({
    initialValues: {
      releaseYear: '',
    },
  });

  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    if (Object.keys(queryParams).length > 0) {
      form.setValues(queryParams);
    } else {
      form.reset();
    }
  }, [queryParams, form]);

  function onSubmit(data: FilterBarData) {
    onFilterChange(data);
    setOpened(false);
  }

  return (
    <>
      <Button onClick={() => setOpened(true)}>{t('filter_bar.button_text')}</Button>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={t('filter_bar.drawer_title')}
        padding="xl"
        size="xl"
        position="right"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            label={t('filter_bar.release_year.label')}
            placeholder={t('filter_bar.release_year.placeholder')}
            data={RELEASE_YEAR_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            {...form.getInputProps('releaseYear')}
          />
          <Button type="submit" mt="md">
            {t('filter_bar.save_button_text')}
          </Button>
        </form>
      </Drawer>
    </>
  );
};
