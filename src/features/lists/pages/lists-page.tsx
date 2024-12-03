import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Box, Button, Divider, Select, Text } from '@mantine/core';

import { DUMMY_LISTS } from '@/DUMMY_DATA';
import { ViewMode } from '@/types';
import { getCurrentQueryParams } from '@/utils';

import { DisplayModeSelector, ListCardView, ListsItemView } from '../components';
import { SORT_LISTS_OPTIONS } from '../constants';

const ListsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = React.useMemo(() => {
    return getCurrentQueryParams(searchParams);
  }, [searchParams]);

  const { t } = useTranslation();
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');

  React.useEffect(() => {
    if (!queryParams.sort) {
      setSearchParams(
        {
          ...queryParams,
          sort: queryParams.sort || SORT_LISTS_OPTIONS[0].value,
        },
        {
          replace: true,
        },
      );
    }
  }, [queryParams, setSearchParams]);

  const handleParamsChange = (key: string, value: string) => {
    setSearchParams(
      {
        ...queryParams,
        [key]: value,
      },
      {
        replace: true,
      },
    );
  };

  return (
    <>
      <Box mb="md">
        <Button variant="filled">{t('lists.create_list')}</Button>
      </Box>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>
          {DUMMY_LISTS.length} {/*Lists*/}
        </Text>
        <Box style={{ display: 'flex', gap: '1rem' }}>
          <Select
            data={SORT_LISTS_OPTIONS}
            value={queryParams.sort}
            onChange={(newValue) => newValue && handleParamsChange('sort', newValue)}
            placeholder={SORT_LISTS_OPTIONS[0].label}
          />
          <DisplayModeSelector value={viewMode} onChange={(value) => setViewMode(value)} />
        </Box>
      </Box>
      <Divider mb="md" />
      <Box>
        {viewMode === 'list' ? (
          <ListsItemView lists={DUMMY_LISTS} />
        ) : (
          <ListCardView lists={DUMMY_LISTS} />
        )}
      </Box>
    </>
  );
};

export default ListsPage;
