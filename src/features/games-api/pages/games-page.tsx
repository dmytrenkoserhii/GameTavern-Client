import React from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Divider, Pagination, Select, Text } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { DISPLAY_OPTIONS, GamesCardView, GamesItemView } from '@/features/lists';
import { useQueryParams } from '@/hooks';
import { GamesQueryParams, SelectItemWithIcon, ViewMode } from '@/types';
import { getErrorMessage } from '@/utils';

import { FilterGameRightBar } from '../components';
import { GAMES_LIMIT_OPTIONS, SORT_GAMES_API_OPTIONS } from '../constants';
import { GamesApiService } from '../services';

const GamesPage: React.FC = () => {
  const { queryParams, updateQueryParams } = useQueryParams<GamesQueryParams>();
  const { t } = useTranslation();
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');

  React.useEffect(() => {
    if (!queryParams.sort) {
      updateQueryParams({
        sort: SORT_GAMES_API_OPTIONS[0].value,
        page: '1',
        limit: GAMES_LIMIT_OPTIONS[0].value,
      });
    }
  }, [queryParams.sort, updateQueryParams]);

  const getGamesRequestData = {
    limit: queryParams.limit ? queryParams.limit : '12',
    page: queryParams.page ? queryParams.page : '1',
    sort: queryParams.sort || SORT_GAMES_API_OPTIONS[0].value,
    platform: queryParams.platform,
    releaseYear: queryParams.releaseYear,
  };

  const handleParamsChange = (data: GamesQueryParams) => {
    updateQueryParams(data);
  };

  const selectedOption = DISPLAY_OPTIONS.find((opt: SelectItemWithIcon) => opt.value === viewMode);

  const {
    data: gamesData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['games', queryParams],
    queryFn: () => GamesApiService.getAllGames(getGamesRequestData),
  });

  if (error) {
    return <Text>{getErrorMessage(error)}</Text>;
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>{gamesData?.total || 0} Games</Text>
        <Box style={{ display: 'flex', gap: '1rem' }}>
          <FilterGameRightBar queryParams={queryParams} onFilterChange={handleParamsChange} />
          <Select
            data={SORT_GAMES_API_OPTIONS}
            value={queryParams.sort}
            onChange={(newValue) => newValue && handleParamsChange({ sort: newValue })}
            placeholder={SORT_GAMES_API_OPTIONS[0].label}
          />
          <Select
            data={GAMES_LIMIT_OPTIONS}
            value={queryParams.limit?.toString() || '8'}
            onChange={(newLimit) => newLimit && handleParamsChange({ limit: newLimit, page: '1' })}
            placeholder={GAMES_LIMIT_OPTIONS[0].label}
          />
          <Select
            data={DISPLAY_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.label),
              leftSection: <option.icon size={16} />,
            }))}
            value={viewMode}
            onChange={(value) => value && setViewMode(value as ViewMode)}
            leftSection={selectedOption ? <selectedOption.icon size={16} /> : null}
          />
        </Box>
      </Box>
      <Divider mb="md" />
      <Box style={{ flex: 1, minHeight: 'calc(100vh - 330px)' }}>
        {viewMode === 'list' ? (
          <GamesItemView games={gamesData?.games || []} onGameClick={() => {}} />
        ) : (
          <GamesCardView games={gamesData?.games || []} onGameClick={() => {}} />
        )}
      </Box>
      <Box mt="auto" py="md" style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          total={gamesData?.totalPages || 0}
          value={queryParams.page ? Number(queryParams.page) : 1}
          onChange={(page) => handleParamsChange({ page: page.toString() })}
          disabled={isLoading}
        />
      </Box>
    </>
  );
};

export default GamesPage;
