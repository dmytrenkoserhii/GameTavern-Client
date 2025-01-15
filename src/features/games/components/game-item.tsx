import React from 'react';

import { useTranslation } from 'react-i18next';
import { BiListPlus, BiTrash } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Menu,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGameRoute } from '@/enums';
import { Game, GamesService } from '@/features/games';
import { GameApi } from '@/features/games-api';
import { GetListsRequestData, ListsService } from '@/features/lists';
import { getImageUrl } from '@/utils';

interface GameItemProps {
  game: GameApi | Game;
  listId?: number;
  isEditing?: boolean;
}

export const GameItem: React.FC<GameItemProps> = ({ game, listId, isEditing }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = React.useState<string | null>(null);
  const [addToListModalOpened, { open: openAddToListModal, close: closeAddToListModal }] =
    useDisclosure(false);

  const { data: listsResponse } = useQuery({
    queryKey: ['lists'],
    queryFn: () =>
      ListsService.getLists({
        page: 1,
        limit: 100,
        sort: 'createdAt:DESC',
      } as GetListsRequestData),
  });

  const { mutate: addToList } = useMutation({
    mutationFn: (targetListId: number) =>
      GamesService.createGame({
        gameApiId: game.id,
        name: game.name,
        coverUrl: getImageUrl(game),
        listId: targetListId,
      }),
    onSuccess: () => {
      notifications.show({
        title: t('games.add_success'),
        message: t('games.add_success_message'),
        color: 'green',
      });
      closeAddToListModal();
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  const { mutate: deleteGame } = useMutation({
    mutationFn: () => GamesService.deleteGame(game.id),
    onSuccess: () => {
      notifications.show({
        title: t('games.game_card.remove_success'),
        message: t('games.game_card.remove_success_message'),
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['games', String(listId)] });
    },
  });

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.menu-container')) {
      navigate(getGameRoute(game.id));
    }
  };

  return (
    <>
      <Paper
        p="md"
        style={{
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
      >
        <Group justify="space-between" wrap="nowrap">
          <Group wrap="nowrap" gap="lg">
            <Box style={{ width: 80, height: 100, flexShrink: 0 }}>
              <Image
                src={getImageUrl(game)}
                alt={game.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Text size="md" fw={500}>
              {game.name}
            </Text>
          </Group>

          <Menu shadow="md" position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="menu-container"
                style={{ flexShrink: 0 }}
              >
                <BsThreeDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {listId ? (
                isEditing && (
                  <Menu.Item
                    leftSection={<BiTrash size={16} />}
                    color="red"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteGame();
                    }}
                  >
                    {t('games.game_card.remove_from_list')}
                  </Menu.Item>
                )
              ) : (
                <Menu.Item
                  leftSection={<BiListPlus size={16} />}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openAddToListModal();
                  }}
                >
                  {t('games.add_to_list')}
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Paper>

      <Modal
        opened={addToListModalOpened}
        onClose={closeAddToListModal}
        title={t('games.add_to_list')}
      >
        <Stack>
          <Select
            data={
              listsResponse?.items.map((list) => ({
                value: String(list.id),
                label: list.name,
              })) || []
            }
            value={selectedList}
            onChange={setSelectedList}
            placeholder={t('games.select_list_placeholder')}
          />
          <Button
            onClick={() => selectedList && addToList(Number(selectedList))}
            disabled={!selectedList}
          >
            {t('games.add_to_list_confirm')}
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
