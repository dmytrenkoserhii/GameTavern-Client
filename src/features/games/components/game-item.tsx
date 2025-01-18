import React from 'react';

import { useTranslation } from 'react-i18next';
import { BiListPlus, BiTransfer, BiTrash } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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

import { QueryKeys, getGameRoute } from '@/enums';
import { Game, GamesService } from '@/features/games';
import { GameApi } from '@/features/games-api';
import { GetListsRequestData, ListsService } from '@/features/lists';

import { getImageUrl } from '../utils';

interface GameItemProps {
  game: GameApi | Game;
  listId?: number;
  isEditing?: boolean;
}

export const GameItem: React.FC<GameItemProps> = ({ game, listId, isEditing }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedList, setSelectedList] = React.useState<string | null>(null);
  const [addToListModalOpened, { open: openAddToListModal, close: closeAddToListModal }] =
    useDisclosure(false);
  const [moveModalOpened, { open: openMoveModal, close: closeMoveModal }] = useDisclosure(false);

  const { data: listsResponse } = useQuery({
    queryKey: [QueryKeys.LISTS],
    queryFn: () =>
      ListsService.getLists({
        page: 1,
        limit: 100,
        sort: 'createdAt:DESC',
      } as GetListsRequestData),
  });

  const { mutate: deleteGame } = useMutation({
    mutationFn: () => GamesService.deleteGame(game.id),
    onSuccess: () => {
      notifications.show({
        title: t('games.game_card.delete_success'),
        message: t('games.game_card.delete_success_message'),
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GAMES, String(listId)] });
    },
  });

  const { mutate: moveGame } = useMutation({
    mutationFn: (targetListId: number) => GamesService.moveGame(game.id, targetListId),
    onSuccess: () => {
      notifications.show({
        title: t('games.game_card.move_success'),
        message: t('games.game_card.move_success_message'),
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GAMES] });
      setSelectedList(null);
      closeMoveModal();
    },
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
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GAMES, String(listId)],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LISTS],
      });
    },
  });

  const filteredListOptions = React.useMemo(
    () =>
      listsResponse?.items
        .filter((list) => list.id !== listId)
        .map((list) => ({
          value: String(list.id),
          label: list.name,
        })) || [],
    [listsResponse?.items, listId],
  );

  const allListsOptions = React.useMemo(
    () =>
      listsResponse?.items.map((list) => ({
        value: String(list.id),
        label: list.name,
      })) || [],
    [listsResponse?.items],
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteGame();
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    openAddToListModal();
  };

  const handleMove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openMoveModal();
  };

  const GameContent = () => (
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
    </Group>
  );

  return (
    <>
      <Paper p="md" style={{ position: 'relative' }}>
        {isEditing ? (
          <GameContent />
        ) : (
          <Link
            to={getGameRoute('gameApiId' in game ? game.gameApiId : game.id)}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <GameContent />
          </Link>
        )}

        <Menu shadow="md" position="bottom-end" withinPortal>
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <BsThreeDotsVertical size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {listId ? (
              <>
                <Menu.Item leftSection={<BiTransfer size={16} />} onClick={handleMove}>
                  {t('games.game_card.move_to_list')}
                </Menu.Item>
                {isEditing && (
                  <Menu.Item leftSection={<BiTrash size={16} />} color="red" onClick={handleDelete}>
                    {t('games.game_card.delete_from_list')}
                  </Menu.Item>
                )}
              </>
            ) : (
              <Menu.Item leftSection={<BiListPlus size={16} />} onClick={handleAddToList}>
                {t('games.game_card.move_to_list')}
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Paper>

      <Modal
        opened={addToListModalOpened}
        onClose={closeAddToListModal}
        title={t('games.add_to_list')}
      >
        <Stack>
          <Select
            data={allListsOptions}
            value={selectedList}
            onChange={setSelectedList}
            placeholder={t('games.game_card.select_list_placeholder')}
          />
          <Button
            onClick={() => selectedList && addToList(Number(selectedList))}
            disabled={!selectedList}
          >
            {t('games.add_to_list_confirm')}
          </Button>
        </Stack>
      </Modal>

      <Modal
        opened={moveModalOpened}
        onClose={closeMoveModal}
        title={t('games.game_card.move_to_list')}
      >
        <Stack>
          <Select
            data={filteredListOptions}
            value={selectedList}
            onChange={setSelectedList}
            placeholder={t('games.game_card.select_list_placeholder')}
          />
          <Button
            onClick={() => selectedList && moveGame(Number(selectedList))}
            disabled={!selectedList}
          >
            {t('games.game_card.move_confirm')}
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
