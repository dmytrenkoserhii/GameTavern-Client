import { DateTime } from 'luxon';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Box, Flex, Stack, Text, Title } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { NotFoundReturn, Spinner } from '@/components';
import { QueryKeys, Routes } from '@/enums';
import { AddGameToList, GameCard, GameInfoModal, GameMetaData } from '@/features/games';
import { useRedirectTimer } from '@/hooks';

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
    queryKey: [QueryKeys.GAME, id],
    queryFn: () => {
      if (!id) {
        return;
      }
      return GamesApiService.getGame(id);
    },
  });

  const { data: similarGamesData } = useQuery({
    queryKey: [QueryKeys.SIMILAR_GAMES, game?.similar_games],
    queryFn: async () => {
      if (!game?.similar_games) {
        return [];
      }

      const similarGames = await Promise.all(
        game.similar_games.map(async (similarGame) => {
          const fullGame = await GamesApiService.getGame(String(similarGame.id));
          return fullGame;
        }),
      );
      return similarGames;
    },
    enabled: !!game?.similar_games,
  });

  React.useEffect(() => {
    if (isError) {
      startRedirectTimer();
    }
  }, [isError, startRedirectTimer]);

  const releaseInfo = game
    ? `released on ${DateTime.fromISO(game.original_release_date || '').toFormat('MMM dd, yyyy')} by ${game.developers?.[0]?.name || 'Unknown Developer'}`
    : '';

  const similarGamesList = similarGamesData?.map((similarGame) => (
    <Box key={similarGame.id} style={{ width: 'calc(25% - 12px)' }}>
      <GameCard game={similarGame} />
    </Box>
  ));

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
    <Box p="xl" maw={1200}>
      <Flex gap="xl">
        <Box style={{ width: 300 }}>
          <img
            src={game?.image.original_url}
            alt={game?.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
          <Stack align="center" mt="md">
            {game && <AddGameToList game={game} />}
            {game && <GameInfoModal gameName={game.name} />}
          </Stack>
        </Box>

        <Box style={{ flex: 1 }}>
          <Title order={1} mb="sm">
            {game?.name}
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            {releaseInfo}
          </Text>
          <Text mb="xl">{game?.deck}</Text>
          {game && <GameMetaData game={game} />}

          {game?.similar_games && (
            <Box mt="xl">
              <Title order={3} mb="md">
                {t('games.similar_games_title')}
              </Title>
              <Flex gap="md" wrap="wrap">
                {similarGamesList}
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default GamePage;
