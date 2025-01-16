import { arrayMove } from '@dnd-kit/sortable';
import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Divider, Select, Text, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { GamesCardList, GamesItemList, GamesService } from '@/features/games';
import { useQueryParams } from '@/hooks';
import { ListQueryParams, SelectItemWithIcon, ViewMode } from '@/types';
import { getErrorMessage } from '@/utils';

import { FilterListRightBar } from '../components';
import { DISPLAY_OPTIONS, SORT_GAMES_OPTIONS } from '../constants';
import { listFormSchema } from '../schemas';
import { ListsService } from '../services';
import { EditListRequestData, List } from '../types';

type ListForm = z.infer<typeof listFormSchema>;

const ListPage: React.FC = () => {
  const { queryParams, updateQueryParams } = useQueryParams<ListQueryParams>();
  const [isEditing, setIsEditing] = React.useState(false);
  const [orderedGames, setOrderedGames] = React.useState<typeof games>([]);
  const [hasOrderChanges, setHasOrderChanges] = React.useState(false);
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');

  const {
    data: list,
    error,
    isLoading,
  } = useQuery<List>({
    queryKey: ['list', id],
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('ID is required'));
      }
      return ListsService.getCurrentList(id);
    },
  });

  const { data: games = [] } = useQuery({
    queryKey: ['games', id],
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('ID is required'));
      }
      return GamesService.getGamesByList(Number(id));
    },
    enabled: !!id,
  });

  const form = useForm<ListForm>({
    initialValues: {
      name: list?.name || '',
      description: list?.description || '',
    },
    validate: zodResolver(listFormSchema),
  });

  const { mutate: editList, isPending } = useMutation({
    mutationFn: ({ id, editListData }: { id: string; editListData: EditListRequestData }) =>
      ListsService.editList(id, editListData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', id] });
    },
  });

  const { mutate: deleteList } = useMutation({
    mutationFn: (id: string) => ListsService.deleteList(id),
    onSuccess: () => {
      navigate('/lists');
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  const { mutate: updateGameOrder } = useMutation({
    mutationFn: (updates: { id: number; orderNumber: number }[]) =>
      GamesService.updateGameOrder(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games', id] });
      setHasOrderChanges(false);
    },
  });

  React.useEffect(() => {
    if (games) {
      setOrderedGames(games);
    }
  }, [games]);

  const handleReorder = (oldIndex: number, newIndex: number) => {
    const newOrder = arrayMove(orderedGames, oldIndex, newIndex);
    setOrderedGames(newOrder);

    const hasChanged =
      JSON.stringify(newOrder.map((g) => g.id)) !== JSON.stringify(games.map((g) => g.id));

    setHasOrderChanges(hasChanged);
  };

  const handleSaveChanges = () => {
    if (isEditing && hasOrderChanges) {
      const updates = orderedGames.map((game, index) => ({
        id: game.id,
        orderNumber: index + 1,
      }));
      updateGameOrder(updates);
    }

    if (form.isDirty()) {
      editList({
        id: id!,
        editListData: {
          name: form.values.name,
          description: form.values.description,
        },
      });
    }

    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveChanges();
    } else {
      form.setValues({
        name: list?.name || '',
        description: list?.description || '',
      });
      setIsEditing(true);
    }
  };

  const handleCancelChanges = () => {
    setOrderedGames(games);
    setHasOrderChanges(false);
  };

  const handleDelete = () => {
    if (id) {
      deleteList(id);
    }
  };

  React.useEffect(() => {
    if (!queryParams.sort) {
      updateQueryParams({ sort: SORT_GAMES_OPTIONS[0].value });
    }
  }, [queryParams.sort, updateQueryParams]);

  const handleParamsChange = (data: ListQueryParams) => {
    updateQueryParams(data);
  };

  const selectedOption = DISPLAY_OPTIONS.find((opt: SelectItemWithIcon) => opt.value === viewMode);

  if (error) {
    return <Text>{getErrorMessage(error)}</Text>;
  }

  if (isLoading || isPending) {
    return <Spinner />;
  }

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
                {list?.name}
              </Text>
            )}
          </Box>
          <Box style={{ display: 'flex', gap: '10px' }}>
            {isEditing && (
              <>
                <Button variant="outline" color="red" w={180} onClick={handleDelete}>
                  {t('lists.delete_list_button')}
                </Button>
                {hasOrderChanges && (
                  <Button variant="outline" w={180} onClick={handleCancelChanges}>
                    {t('general.cancel_changes')}
                  </Button>
                )}
              </>
            )}
            <Button
              variant="outline"
              w={180}
              onClick={handleEditToggle}
              disabled={isEditing && !hasOrderChanges && !form.isDirty()}
            >
              {t(isEditing ? 'general.save_changes' : 'lists.edit_list_button')}
            </Button>
          </Box>
        </Box>

        <Box style={{ maxWidth: '50%' }}>
          {isEditing ? (
            <Textarea
              {...form.getInputProps('description')}
              minRows={2}
              placeholder={t('lists.description_placeholder')}
            />
          ) : (
            <Text>{list?.description}</Text>
          )}
        </Box>
      </Box>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>
          {games.length} {t('games.count')}
        </Text>
        <Box style={{ display: 'flex', gap: '1rem' }}>
          <FilterListRightBar queryParams={queryParams} onFilterChange={handleParamsChange} />
          <Select
            data={SORT_GAMES_OPTIONS}
            value={queryParams.sort}
            onChange={(newValue) => newValue && handleParamsChange({ sort: newValue })}
            placeholder={SORT_GAMES_OPTIONS[0].label}
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
      <Box>
        {viewMode === 'list' ? (
          <GamesItemList
            games={orderedGames}
            listId={Number(id)}
            isEditing={isEditing}
            onReorder={handleReorder}
          />
        ) : (
          <GamesCardList
            games={orderedGames}
            listId={Number(id)}
            isEditing={isEditing}
            onReorder={handleReorder}
          />
        )}
      </Box>
    </>
  );
};

export default ListPage;
