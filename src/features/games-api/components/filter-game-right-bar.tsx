import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Drawer, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useQuery } from '@tanstack/react-query';

import { ListFilterData, ListQueryParams } from '@/types';
import { generateYearsOptions } from '@/utils';

import { GamesApiService } from '../services';

interface FilterGameRightBarProps {
  queryParams: Partial<ListQueryParams>;
  onFilterChange: (data: Partial<ListFilterData>) => void;
}

const RELEASE_YEAR_OPTIONS = generateYearsOptions(1990);

export const FilterGameRightBar: React.FC<FilterGameRightBarProps> = ({
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

  const [isOpened, setIsOpened] = React.useState(false);

  const { data: platforms } = useQuery({
    queryKey: ['platforms'],
    queryFn: () => GamesApiService.getAllPlatforms(),
  });

  React.useEffect(() => {
    if (Object.keys(queryParams).length > 0) {
      form.setValues(queryParams);
    } else {
      form.reset();
    }
  }, [queryParams, form]);

  const onSubmit = (data: ListFilterData) => {
    onFilterChange(data);
    setIsOpened(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpened(true)}>{t('games_api.filter_bar.filter_button')}</Button>
      <Drawer
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title={t('games_api.filter_bar.drawer_title')}
        padding="xl"
        size="xl"
        position="right"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            label={t('games_api.filter_bar.release_year.label')}
            placeholder={t('games_api.filter_bar.release_year.placeholder')}
            data={RELEASE_YEAR_OPTIONS}
            {...form.getInputProps('releaseYear')}
          />
          <Select
            label={t('games_api.filter_bar.platform.label')}
            placeholder={t('games_api.filter_bar.platform.placeholder')}
            data={
              platforms?.map((platform) => ({
                value: platform.id.toString(),
                label: platform.name,
              })) ?? []
            }
            {...form.getInputProps('platform')}
            mt="md"
          />
          <Button type="submit" mt="md">
            {t('general.save_changes')}
          </Button>
        </form>
      </Drawer>
    </>
  );
};
