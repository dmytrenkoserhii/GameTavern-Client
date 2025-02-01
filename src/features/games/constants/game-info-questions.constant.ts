import { BsBook, BsClock, BsCpu, BsJoystick, BsLightbulb, BsListCheck } from 'react-icons/bs';

import { GameInfoQuestion } from '../types';

export const GAME_INFO_QUESTIONS: GameInfoQuestion[] = [
  {
    icon: BsClock,
    translationKey: 'completion_time',
    question: 'How long does it take to beat',
  },
  {
    icon: BsJoystick,
    translationKey: 'difficulty',
    question: 'What is the difficulty level of',
  },
  {
    icon: BsBook,
    translationKey: 'story_summary',
    question: 'Provide a brief spoiler-free summary of',
  },
  {
    icon: BsListCheck,
    translationKey: 'pros_cons',
    question: 'What are the main pros and cons of',
  },
  {
    icon: BsLightbulb,
    translationKey: 'beginner_tips',
    question: 'What are the most important tips for beginners starting',
  },
  {
    icon: BsCpu,
    translationKey: 'system_requirements',
    question: 'What are the recommended system requirements to run',
  },
];
