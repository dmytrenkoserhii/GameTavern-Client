import React from 'react';

import { BiListPlus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ActionIcon, Box, Card, Center, Image, Menu, Stack, Text } from '@mantine/core';

import { GameApi } from '@/features/games-api';

import styles from './game-card.module.css';

interface GameCardProps {
  game: GameApi;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="md"
      withBorder
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box className={styles.container}>
        <Image
          src={game.image.medium_url}
          alt={game.name}
          className={`${styles.image} ${isHovered ? styles.imageHovered : ''}`}
        />
        {isHovered && (
          <>
            <Center className={styles.overlay}>
              <Text fw={700} size="xl" c="white" className={styles.title}>
                {game.name}
              </Text>
            </Center>
            <Stack className={styles.menuContainer}>
              <Menu shadow="md" position="bottom-end" withinPortal>
                <Menu.Target>
                  <ActionIcon variant="filled" color="dark" onClick={(e) => e.stopPropagation()}>
                    <BsThreeDotsVertical color="white" size={20} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<BiListPlus size={16} />}>Add to list</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Stack>
          </>
        )}
      </Box>
    </Card>
  );
};
