import React from 'react';

import { useTranslation } from 'react-i18next';
import { BsStars } from 'react-icons/bs';

import { Button, Modal, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useMutation } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { Game, GameCard } from '@/features/games';
import { GameApi } from '@/features/games-api';

import { ListsService } from '../services';
import { RecommendationsParams } from '../types';

interface GameRecommendationsModalProps {
  games: Game[];
}

export const GameRecommendationsModal: React.FC<GameRecommendationsModalProps> = ({ games }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [existingRecommendations, setExistingRecommendations] = React.useState<GameApi[]>([]);
  const { t } = useTranslation();

  const { mutate: getRecommendations, isPending } = useMutation({
    mutationFn: (params: RecommendationsParams) => ListsService.getGamesRecommendations(params),
    onSuccess: (newRecommendations) => {
      setExistingRecommendations((prev) => [...prev, ...newRecommendations]);
    },
  });

  const handleGetRecommendations = () => {
    const gameNames = games.map((game) => game.name);

    open();

    setExistingRecommendations([]);

    getRecommendations({ games: gameNames });
  };

  const handleLoadMore = () => {
    const gameNames = games.map((game) => game.name);

    getRecommendations({
      games: gameNames,
      existingRecommendations: existingRecommendations.map((game) => game.name),
    });
  };

  return (
    <>
      <Button
        onClick={handleGetRecommendations}
        disabled={games.length === 0}
        leftSection={<BsStars size={16} />}
      >
        {t('lists.recommendations.get_recommendations')}
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          setExistingRecommendations([]);
        }}
        title={t('lists.recommendations.modal_title')}
        size="xl"
      >
        {isPending && existingRecommendations.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <SimpleGrid cols={5} spacing="md">
              {existingRecommendations.map((game, index) => (
                <GameCard key={`${game.id}-${index}`} game={game} />
              ))}
            </SimpleGrid>

            {existingRecommendations.length < 30 && (
              <Button onClick={handleLoadMore} mt="md" fullWidth disabled={isPending}>
                {isPending ? t('general.loading') : t('lists.recommendations.load_more')}
              </Button>
            )}
          </>
        )}
      </Modal>
    </>
  );
};
