import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';

import { Box, Button, Divider, Select, Text } from '@mantine/core';

import { DUMMY_API_GAMES, DUMMY_LISTS } from '@/DUMMY_DATA';
import { ViewMode } from '@/types';
import { getCurrentQueryParams, removeObjectEmptyProperties } from '@/utils';

import {
  DisplayModeSelector,
  FilterListRightBar,
  GamesCardView,
  GamesItemView,
} from '../components';
import { SORT_GAMES_OPTIONS } from '../constants';
import { ListFilterData } from '../types';

const ListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = React.useMemo(() => {
    return getCurrentQueryParams(searchParams);
  }, [searchParams]);

  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const currentList = DUMMY_LISTS.find((list) => list.id === Number(id));

  React.useEffect(() => {
    if (!queryParams.sort) {
      setSearchParams(
        {
          ...queryParams,
          sort: queryParams.sort || SORT_GAMES_OPTIONS[0].value,
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

  const handleFilterChange = (data: ListFilterData) => {
    const cleanedData = removeObjectEmptyProperties(data);

    setSearchParams(
      {
        ...queryParams,
        ...cleanedData,
      },
      {
        replace: true,
      },
    );
  };

  return (
    <>
      <Box mb="md">
        <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Text size="xl" fw={700}>
            {currentList?.name}
          </Text>
          <Button variant="outline" style={{ marginLeft: '10px' }}>
            {t('lists.edit_list_button')}
          </Button>
        </Box>

        <Text>{currentList?.description}</Text>
      </Box>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>
          {DUMMY_API_GAMES.length} {/*Games*/}
        </Text>
        <Box style={{ display: 'flex', gap: '1rem' }}>
          <Select
            data={SORT_GAMES_OPTIONS}
            value={queryParams.sort}
            onChange={(newValue) => newValue && handleParamsChange('sort', newValue)}
            placeholder={SORT_GAMES_OPTIONS[0].label}
          />
          <FilterListRightBar queryParams={queryParams} onFilterChange={handleFilterChange} />
          <DisplayModeSelector value={viewMode} onChange={(value) => setViewMode(value)} />
        </Box>
      </Box>
      <Divider mb="md" />
      <Box>
        {viewMode === 'list' ? (
          <GamesItemView games={DUMMY_API_GAMES} onGameClick={() => {}} />
        ) : (
          <GamesCardView games={DUMMY_API_GAMES} onGameClick={() => {}} />
        )}
      </Box>
    </>
  );
};

export default ListPage;
