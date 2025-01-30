import React from 'react';

import { useTranslation } from 'react-i18next';

import { Badge, Box, Flex, Text } from '@mantine/core';

import { GameApi } from '@/features/games-api';

interface GameMetaDataProps {
  game: GameApi;
}

export const GameMetaData: React.FC<GameMetaDataProps> = ({ game }) => {
  const { t } = useTranslation();

  const platformBadges = game.platforms.map((platform) => (
    <Badge key={platform.id} color="violet" variant="filled">
      {platform.name}
    </Badge>
  ));

  const genreBadges = game.genres.map((genre) => (
    <Badge key={genre.id} color="violet" variant="filled">
      {genre.name}
    </Badge>
  ));

  return (
    <Box>
      <Text size="sm" c="dimmed" mb={8}>
        {t('games.meta_data_platforms')}
      </Text>
      <Flex gap={8} wrap="wrap" mb="lg">
        {platformBadges}
      </Flex>

      <Text size="sm" c="dimmed" mb={8}>
        {t('games.meta_data_genres')}
      </Text>
      <Flex gap={8} wrap="wrap">
        {genreBadges}
      </Flex>
    </Box>
  );
};
