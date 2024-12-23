import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Drawer, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

import { ListFilterData, ListQueryParams } from '@/types';
import { generateYearsOptions } from '@/utils';

interface FilterListRightBarProps {
  queryParams: Partial<ListQueryParams>;
  onFilterChange: (data: Partial<ListFilterData>) => void;
}

const RELEASE_YEAR_OPTIONS = generateYearsOptions(2010);

export const FilterListRightBar: React.FC<FilterListRightBarProps> = ({
  queryParams,
  onFilterChange,
}) => {
  const { t } = useTranslation();

  const form = useForm<ListFilterData>({
    initialValues: {
      releaseYear: '',
      platform: '',
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

  function onSubmit(data: ListFilterData) {
    onFilterChange(data);
    setOpened(false);
  }

  return (
    <>
      <Button onClick={() => setOpened(true)}>{t('lists.filter_bar.filter_button')}</Button>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={t('lists.filter_bar.drawer_title')}
        padding="xl"
        size="xl"
        position="right"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            label={t('lists.filter_bar.release_year.label')}
            placeholder={t('lists.filter_bar.release_year.placeholder')}
            data={RELEASE_YEAR_OPTIONS}
            {...form.getInputProps('releaseYear')}
          />
          <Button type="submit" mt="md">
            {t('general.save_changes')}
          </Button>
        </form>
      </Drawer>
    </>
  );
};
