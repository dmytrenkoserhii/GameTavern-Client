import React from 'react';

import { useTranslation } from 'react-i18next';
import { BsStars } from 'react-icons/bs';

import { Button, Modal, SimpleGrid, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useMutation } from '@tanstack/react-query';

import { Spinner } from '@/components';

import { GAME_INFO_QUESTIONS } from '../constants/game-info-questions.constant';
import { GamesService } from '../services/games.service';

interface GameInfoModalProps {
  gameName: string;
}

export const GameInfoModal: React.FC<GameInfoModalProps> = ({ gameName }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [answer, setAnswer] = React.useState<string>('');
  const { t } = useTranslation();

  const { mutate: getGameInfo, isPending } = useMutation({
    mutationFn: (question: string) => GamesService.getGameInfoQuestions({ gameName, question }),
    onSuccess: (data) => {
      setAnswer(data.answer);
    },
  });

  const handleClose = () => {
    close();
    setAnswer('');
  };

  const handleQuestionClick = (question: string) => {
    setAnswer('');
    getGameInfo(question);
  };

  const questionButtons = GAME_INFO_QUESTIONS.map(({ icon: Icon, translationKey, question }) => (
    <Button
      key={translationKey}
      leftSection={<Icon size={16} />}
      onClick={() => handleQuestionClick(question)}
      disabled={isPending}
      variant="light"
      fullWidth
    >
      {t(`games.game_info.${translationKey}`)}
    </Button>
  ));

  return (
    <>
      <Button onClick={open} leftSection={<BsStars size={16} />} fullWidth>
        {t('games.game_info.ask_about_game')}
      </Button>

      <Modal
        opened={opened}
        onClose={handleClose}
        title={t('games.game_info.modal_title')}
        size="lg"
      >
        <Stack gap="md">
          <SimpleGrid cols={3}>{questionButtons}</SimpleGrid>

          {isPending ? <Spinner /> : answer && <Text>{answer}</Text>}
        </Stack>
      </Modal>
    </>
  );
};
