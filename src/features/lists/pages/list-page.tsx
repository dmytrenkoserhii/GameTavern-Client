import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Box, Button, Divider, Select, Text, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { DUMMY_API_GAMES, DUMMY_LISTS } from '@/DUMMY_DATA';
import { useQueryParams } from '@/hooks';
import { ViewMode } from '@/types';

import {
  DisplayModeSelector,
  FilterListRightBar,
  GamesCardView,
  GamesItemView,
} from '../components';
import { SORT_GAMES_OPTIONS } from '../constants';
import { listFormSchema } from '../schemas';
import { FilterListRightBarData, ListQueryParams } from '../types';

type ListForm = z.infer<typeof listFormSchema>;

const ListPage: React.FC = () => {
  const { queryParams, updateQueryParams } = useQueryParams<ListQueryParams>();
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = React.useState(false);

  const { t } = useTranslation();
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');
  const currentList = DUMMY_LISTS.find((list) => list.id === Number(id));

  const form = useForm<ListForm>({
    initialValues: {
      name: currentList?.name || '',
      description: currentList?.description || '',
    },
    validate: zodResolver(listFormSchema),
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      form.setValues({
        name: currentList?.name || '',
        description: currentList?.description || '',
      });
      setIsEditing(true);
    }
  };

  React.useEffect(() => {
    if (!queryParams.sort) {
      updateQueryParams({ sort: SORT_GAMES_OPTIONS[0].value });
    }
  }, [queryParams.sort, updateQueryParams]);

  const handleParamsChange = (key: string, value: string) => {
    updateQueryParams({ [key]: value });
  };

  const handleFilterChange = (data: Partial<FilterListRightBarData>) => {
    updateQueryParams(data);
  };

  return (
    <>
      <Box mb="md">
        <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box style={{ maxWidth: '50%' }}>
            {isEditing ? (
              <TextInput
                {...form.getInputProps('name')}
                size="lg"
                placeholder={t('lists.name_placeholder')}
              />
            ) : (
              <Text size="xl" fw={700}>
                {currentList?.name}
              </Text>
            )}
          </Box>
          <Button
            variant="outline"
            w={180}
            style={{ marginLeft: '10px' }}
            onClick={handleEditToggle}
          >
            {t(isEditing ? 'general.save_changes' : 'lists.edit_list_button')}
          </Button>
        </Box>

        <Box style={{ maxWidth: '50%' }}>
          {isEditing ? (
            <Textarea
              {...form.getInputProps('description')}
              minRows={2}
              placeholder={t('lists.description_placeholder')}
            />
          ) : (
            <Text>{currentList?.description}</Text>
          )}
        </Box>
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
