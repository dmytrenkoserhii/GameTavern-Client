import React from 'react';

import { useTranslation } from 'react-i18next';
import { BsStars } from 'react-icons/bs';

import { Button, Modal, SimpleGrid, Textarea } from '@mantine/core';
import { useField } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { useMutation } from '@tanstack/react-query';

import { Spinner } from '@/components';
import { GameApi } from '@/features/games-api';

import { GamesService } from '../services';
import { GameCard } from './game-card/game-card';

export const GamesByDescriptionModal: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const description = useField({
    initialValue: '',
    validate: (value) => (!value.trim() ? 'Description is required' : null),
  });
  const [recommendations, setRecommendations] = React.useState<GameApi[]>([]);
  const { t } = useTranslation();

  const { mutate: getRecommendations, isPending } = useMutation({
    mutationFn: (description: string) => GamesService.getGameByDescription(description),
    onSuccess: (newRecommendations) => {
      setRecommendations(newRecommendations);
    },
  });

  const handleSubmit = () => {
    if (!description.getInputProps().value) {
      return;
    }

    setRecommendations([]);
    getRecommendations(description.getInputProps().value);
  };

  const handleClose = () => {
    close();
    description.reset();
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
          {...description.getInputProps()}
          placeholder={t('games.recommendations.description_placeholder')}
          minRows={3}
          mb="md"
          disabled={isPending}
        />

        <Button
          onClick={handleSubmit}
          fullWidth
          mb="xl"
          disabled={!description.getInputProps().value || isPending}
        >
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
