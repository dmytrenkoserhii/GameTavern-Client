import { useTranslation } from 'react-i18next';
import { BiListPlus, BiTrash } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ActionIcon, Box, Group, Image, Menu, Paper, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Game, GamesService } from '@/features/games';
import { GameApi } from '@/features/games-api';

interface GameItemProps {
  game: GameApi | Game;
  listId?: number;
  isEditing?: boolean;
}

export const GameItem: React.FC<GameItemProps> = ({ game, listId, isEditing }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: removeGame } = useMutation({
    mutationFn: () => GamesService.removeGame(game.id),
    onSuccess: () => {
      notifications.show({
        title: t('games.game_card.remove_success'),
        message: t('games.game_card.remove_success_message'),
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['games', String(listId)] });
    },
  });

  const getImageUrl = () => {
    if ('image' in game) {
      return (game as GameApi).image.medium_url;
    }
    return (game as Game).coverUrl;
  };

  return (
    <Paper
      p="md"
      style={{
        cursor: 'pointer',
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="lg">
          <Box style={{ width: 80, height: 100, flexShrink: 0 }}>
            <Image
              src={getImageUrl()}
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
              onClick={(e) => e.stopPropagation()}
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
                    e.stopPropagation();
                    removeGame();
                  }}
                >
                  {t('games.game_card.remove_from_list')}
                </Menu.Item>
              )
            ) : (
              <Menu.Item leftSection={<BiListPlus size={16} />}>{t('games.add_to_list')}</Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};
