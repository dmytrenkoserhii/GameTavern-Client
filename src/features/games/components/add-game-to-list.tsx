import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Modal, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GameApi } from '@/features/games-api';
import { GetListsRequestData, ListsService } from '@/features/lists';

import { GamesService } from '../services';

interface AddGameToListProps {
  game: GameApi;
}

export const AddGameToList: React.FC<AddGameToListProps> = ({ game }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedList, setSelectedList] = React.useState<string | null>(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: lists } = useQuery({
    queryKey: ['lists'],
    queryFn: () =>
      ListsService.getLists({
        page: 1,
        limit: 100,
        sort: 'createdAt:DESC',
      } as GetListsRequestData),
  });

  const { mutate: addGame, isPending } = useMutation({
    mutationFn: (listId: number) =>
      GamesService.createGame({
        gameApiId: game.id,
        name: game.name,
        coverUrl: game.image.original_url,
        listId,
      }),
    onSuccess: (_, listId) => {
      notifications.show({
        title: t('games.add_success'),
        message: t('games.add_success_message'),
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['games', String(listId)] });
      close();
    },
    onError: () => {
      notifications.show({
        title: t('games.add_error'),
        message: t('games.add_error_message'),
        color: 'red',
      });
    },
  });

  const handleSubmit = () => {
    if (selectedList) {
      addGame(Number(selectedList));
    }
  };

  return (
    <>
      <Button onClick={open}>{t('games.add_to_list')}</Button>

      <Modal opened={opened} onClose={close} title={t('games.select_list')}>
        <Stack>
          <Select
            data={
              lists?.items.map((list) => ({
                value: String(list.id),
                label: list.name,
              })) || []
            }
            value={selectedList}
            onChange={setSelectedList}
            placeholder={t('games.select_list_placeholder')}
          />
          <Button onClick={handleSubmit} loading={isPending} disabled={!selectedList}>
            {t('games.add_to_list_confirm')}
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
