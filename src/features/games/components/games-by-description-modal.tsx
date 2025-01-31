import React from 'react';

import { useTranslation } from 'react-i18next';
import { BsStars } from 'react-icons/bs';

import { Button, Modal, SimpleGrid, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useMutation } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { GameApi } from '@/features/games-api';

import { GamesService } from '../services';
import { GameCard } from './game-card';

export const GamesByDescriptionModal: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [description, setDescription] = React.useState<string>('');
  const [recommendations, setRecommendations] = React.useState<GameApi[]>([]);
  const { t } = useTranslation();

  const { mutate: getRecommendations, isPending } = useMutation({
    mutationFn: (description: string) => GamesService.getGameByDescription(description),
    onSuccess: (newRecommendations) => {
      setRecommendations(newRecommendations);
    },
  });

  const handleSubmit = () => {
    if (!description) {
      return;
    }

    setRecommendations([]);
    getRecommendations(description);
  };

  const handleClose = () => {
    close();
    setDescription('');
    setRecommendations([]);
  };

  return (
    <>
      <Button onClick={open} leftSection={<BsStars size={16} />}>
        {t('games.recommendations.get_recommendations_by_description')}
      </Button>

      <Modal
        opened={opened}
        onClose={handleClose}
        title={t('games.recommendations.description_modal_title')}
        size="xl"
      >
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('games.recommendations.description_placeholder')}
          minRows={3}
          mb="md"
          disabled={isPending}
        />

        <Button onClick={handleSubmit} fullWidth mb="xl" disabled={!description || isPending}>
          {isPending ? t('general.loading') : t('games.recommendations.submit')}
        </Button>

        {isPending ? (
          <Spinner />
        ) : (
          recommendations.length > 0 && (
            <SimpleGrid cols={5} spacing="md">
              {recommendations.map((game, index) => (
                <GameCard key={`${game.id}-${index}`} game={game} />
              ))}
            </SimpleGrid>
          )
        )}
      </Modal>
    </>
  );
};
