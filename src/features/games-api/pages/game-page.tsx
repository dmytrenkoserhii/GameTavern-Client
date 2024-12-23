import React from 'react';

import { useParams } from 'react-router-dom';

import { Box, Title } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { Spinner } from '@/components';

import { GamesApiService } from '../services';

const GamePage: React.FC = () => {
  const { id } = useParams();

  const { data: game, isLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => {
      if (!id) {
        return;
      }
      return GamesApiService.getGame(id);
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!game) {
    return <p>Game not found</p>;
  }

  return (
    <Box style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <Box style={{ width: '300px' }}>
        <img
          src={game.image.original_url}
          alt={game.name}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Box style={{ flex: 1 }}>
        <Title order={1}>{game.name}</Title>
      </Box>
    </Box>
  );
};

export default GamePage;
