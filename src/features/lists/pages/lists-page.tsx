import React from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Button, Divider, Pagination, Select, Text } from '@mantine/core';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { useQueryParams } from '@/hooks';
import { SelectItemWithIcon, ViewMode } from '@/types';
import { getErrorMessage } from '@/utils';

import { ListCardView, ListsItemView } from '../components';
import { CREATE_LIST_DATA, DISPLAY_OPTIONS, LIMIT_OPTIONS, SORT_LISTS_OPTIONS } from '../constants';
import { ListsService } from '../services';
import { CreateListRequestData, GetListsRequestData, SortListsQueryParams } from '../types';

const ListsPage: React.FC = () => {
  const { queryParams, updateQueryParams } = useQueryParams<SortListsQueryParams>();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');

  React.useEffect(() => {
    if (!queryParams) {
      updateQueryParams({
        sort: SORT_LISTS_OPTIONS[0].value,
        page: '1',
        limit: LIMIT_OPTIONS[0].value,
      });
    }
  }, [queryParams, updateQueryParams]);

  const getListsRequestData: GetListsRequestData = {
    limit: queryParams.limit ? Number(queryParams.limit) : 8,
    page: queryParams.page ? Number(queryParams.page) : 1,
    sort: queryParams.sort || SORT_LISTS_OPTIONS[0].value,
  };

  const {
    data: lists,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['lists', queryParams.sort, queryParams.limit, queryParams.page],
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
    createList(CREATE_LIST_DATA);
  };

  const selectedOption = DISPLAY_OPTIONS.find((opt: SelectItemWithIcon) => opt.value === viewMode);

  if (error) {
    return <Text>{getErrorMessage(error)}</Text>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
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
          <Select
            data={LIMIT_OPTIONS}
            value={queryParams.limit?.toString() || '8'}
            onChange={(newLimit) => newLimit && handleParamsChange({ limit: newLimit, page: '1' })}
            placeholder={LIMIT_OPTIONS[0].label}
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

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 'calc(100vh - 330px)',
        }}
      >
        {viewMode === 'list' ? (
          <ListsItemView lists={lists?.items || []} />
        ) : (
          <ListCardView lists={lists?.items || []} />
        )}
      </Box>

      <Box mt="auto" py="md" style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          total={lists?.meta.totalPages || 0}
          value={queryParams.page ? Number(queryParams.page) : 1}
          onChange={(page) => handleParamsChange({ page: page.toString() })}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
};

export default ListsPage;
