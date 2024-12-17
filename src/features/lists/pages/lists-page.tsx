import React from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Button, Divider, Select, Text } from '@mantine/core';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { useQueryParams } from '@/hooks';
import { ViewMode } from '@/types';
import { getErrorMessage } from '@/utils';

import { DisplayModeSelector, ListCardView, ListsItemView } from '../components';
import { SORT_LISTS_OPTIONS } from '../constants';
import { ListsService } from '../services';
import { CreateListRequestData, GetListsRequestData, SortListsQueryParams } from '../types';

const ListsPage: React.FC = () => {
  const { queryParams, updateQueryParams } = useQueryParams<SortListsQueryParams>();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');

  React.useEffect(() => {
    if (!queryParams.sort) {
      updateQueryParams({ sort: SORT_LISTS_OPTIONS[0].value });
    }
  }, [queryParams.sort, updateQueryParams]);

  const getListsRequestData: GetListsRequestData = {
    limit: 10,
    page: 1,
    sort: queryParams.sort || SORT_LISTS_OPTIONS[0].value,
  };

  const {
    data: lists,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['lists', queryParams.sort],
    queryFn: () => ListsService.getLists(getListsRequestData),
  });

  const { mutate: createList } = useMutation({
    mutationFn: (createListData: CreateListRequestData) => ListsService.createList(createListData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error creating list:', error);
    },
  });

  const handleParamsChange = (data: SortListsQueryParams) => {
    updateQueryParams(data);
  };

  const handleCreateList = () => {
    createList({
      name: 'New List',
      description: '',
    });
  };

  if (error) {
    return <Text>{getErrorMessage(error)}</Text>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box mb="md">
        <Button variant="filled" onClick={handleCreateList}>
          {t('lists.create_list')}
        </Button>
      </Box>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>
          {lists?.meta.total} {/*Lists*/}
        </Text>
        <Box style={{ display: 'flex', gap: '1rem' }}>
          <Select
            data={SORT_LISTS_OPTIONS}
            value={queryParams.sort}
            onChange={(newValue) => newValue && handleParamsChange({ sort: newValue })}
            placeholder={SORT_LISTS_OPTIONS[0].label}
          />
          <DisplayModeSelector value={viewMode} onChange={(value) => setViewMode(value)} />
        </Box>
      </Box>
      <Divider mb="md" />
      <Box>
        {viewMode === 'list' ? (
          <ListsItemView lists={lists?.items || []} />
        ) : (
          <ListCardView lists={lists?.items || []} />
        )}
      </Box>
    </>
  );
};

export default ListsPage;
