import { BsBook, BsClock, BsCpu, BsJoystick, BsLightbulb, BsListCheck } from 'react-icons/bs';

import { GameInfoQuestion } from '../types';

export const GAME_INFO_QUESTIONS: GameInfoQuestion[] = [
  {
    icon: BsClock,
    translationKey: 'completion_time',
    question: 'How long does it take to beat this game?',
  },
  {
    icon: BsJoystick,
    translationKey: 'difficulty',
    question: 'What is the difficulty level of this game?',
  },
  {
    icon: BsBook,
    translationKey: 'story_summary',
    question: 'Provide a brief spoiler-free summary of this game.',
  },
  {
    icon: BsListCheck,
    translationKey: 'pros_cons',
    question: 'What are the main pros and cons of this game?',
  },
  {
    icon: BsLightbulb,
    translationKey: 'beginner_tips',
    question: 'What are the most important tips for beginners playing this game?',
  },
  {
    icon: BsCpu,
    translationKey: 'system_requirements',
    question: 'What are the recommended system requirements to play this game?',
  },
];
