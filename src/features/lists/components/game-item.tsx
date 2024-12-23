import { BiListPlus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ActionIcon, Box, Group, Image, Menu, Paper, Text } from '@mantine/core';

import { GameApi } from '@/features/games-api';

interface GameItemProps {
  game: GameApi;
  onClick: () => void;
}

export const GameItem: React.FC<GameItemProps> = ({ game, onClick }) => {
  return (
    <Paper
      p="md"
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="lg">
          <Box style={{ width: 80, height: 100, flexShrink: 0 }}>
            <Image
              src={game.image.medium_url}
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
            <Menu.Item leftSection={<BiListPlus size={16} />}>Add to list</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};
