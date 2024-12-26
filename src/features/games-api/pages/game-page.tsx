import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Text, Title } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { Routes } from '@/enums';

import { GamesApiService } from '../services';

const GamePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
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

  if (isError || !game) {
    return (
      <Box p="xl" style={{ textAlign: 'center' }}>
        <Title order={2}>{t('games_api.game_page.not_found_title')}</Title>
        <Text>{t('games_api.game_page.not_found_description')}</Text>

        <Button onClick={() => navigate(Routes.GAMES)} mt="md">
          {t('games_api.game_page.back_to_games')}
        </Button>
      </Box>
    );
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
