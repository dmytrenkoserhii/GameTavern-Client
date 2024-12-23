import { useState } from 'react';

import { BiListPlus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ActionIcon, Box, Card, Center, Image, Menu, Stack, Text } from '@mantine/core';

import { GameApi } from '@/features/games-api';

interface GameCardProps {
  game: GameApi;
  onClick: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="md"
      withBorder
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={game.image.medium_url}
          alt={game.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'brightness(0.75)' : 'none',
          }}
        />
        {isHovered && (
          <>
            <Center
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                transition: 'opacity 0.3s ease',
              }}
            >
              <Text
                fw={700}
                size="xl"
                c="white"
                style={{
                  textAlign: 'center',
                  transition: 'opacity 0.3s ease',
                  ':hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {game.name}
              </Text>
            </Center>
            <Stack
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
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
