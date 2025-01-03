import React from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Box, Title } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { NotFoundReturn, Spinner } from '@/components';
import { Routes } from '@/enums';
import { useRedirectTimer } from '@/hooks';

// import { Routes } from '@/enums';
import { GamesApiService } from '../services';

const GamePage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { startRedirectTimer, countdown, handleNavigate } = useRedirectTimer({
    route: Routes.HOME,
    timeout: 5,
  });

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

  React.useEffect(() => {
    if (isError) {
      startRedirectTimer();
    }
  }, [isError, startRedirectTimer]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <NotFoundReturn
        titleText={t('games_api.games_page.not_found_title')}
        descriptionText={`${t('games_api.games_page.not_found_description')} (${countdown}s)`}
        buttonText={t('games_api.games_page.back_to_games')}
        onClick={handleNavigate}
      />
    );
  }

  return (
    <Box style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <Box style={{ width: '300px' }}>
        <img
          src={game?.image.original_url}
          alt={game?.name}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Box style={{ flex: 1 }}>
        <Title order={1}>{game?.name}</Title>
      </Box>
    </Box>
  );
};

export default GamePage;
