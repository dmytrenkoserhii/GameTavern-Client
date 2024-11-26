import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Button, Divider, Text } from '@mantine/core';

import { ViewMode } from '@/types';

import { DisplayModeSelector, GamesCardView, GamesItemView } from '../components';

const testGames = [
  {
    id: 1,
    guid: '3030-1',
    name: 'Post-Apocalyptic Adventures',
    description:
      'Embark on a journey through a ravaged landscape, fighting for survival and uncovering the mysteries of a fallen civilization. This immersive game combines intense action, deep storytelling, and stunning visuals to create an unforgettable gaming experience.',
    image: {
      icon_url: 'https://www.example.com/images/game1_icon.jpg',
      medium_url: 'https://www.example.com/images/game1_medium.jpg',
      screen_url: 'https://www.example.com/images/game1_screen.jpg',
      screen_large_url: 'https://www.example.com/images/game1_screen_large.jpg',
      small_url: 'https://www.example.com/images/game1_small.jpg',
      super_url: 'https://www.example.com/images/game1_super.jpg',
      thumb_url: 'https://www.example.com/images/game1_thumb.jpg',
      tiny_url: 'https://www.example.com/images/game1_tiny.jpg',
      original_url: 'https://www.example.com/images/game1_original.jpg',
    },
    deck: 'An action-packed adventure game set in a post-apocalyptic world.',
    original_game_rating: {
      id: 1,
      name: 'ESRB: M',
    },
    original_release_date: '2023-09-15T00:00:00.000Z',
    platforms: [
      {
        id: 1,
        name: 'PlayStation 5',
        abbreviation: 'PS5',
      },
      {
        id: 2,
        name: 'Xbox Series X',
        abbreviation: 'XSX',
      },
      {
        id: 3,
        name: 'PC',
        abbreviation: 'PC',
      },
    ],
    genres: [
      {
        id: 1,
        name: 'Action',
      },
      {
        id: 2,
        name: 'Adventure',
      },
      {
        id: 3,
        name: 'RPG',
      },
    ],
    similar_games: [
      {
        api_detail_url: 'https://api.example.com/games/2',
        id: 2,
        name: 'Wasteland Wanderer',
        site_detail_url: 'https://www.example.com/games/wasteland-wanderer',
      },
      {
        api_detail_url: 'https://api.example.com/games/3',
        id: 3,
        name: 'Neon Survivors',
        site_detail_url: 'https://www.example.com/games/neon-survivors',
      },
    ],
    developers: [
      {
        api_detail_url: 'https://api.example.com/companies/1',
        id: 1,
        name: 'Apocalypse Games',
        site_detail_url: 'https://www.example.com/companies/apocalypse-games',
      },
    ],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-09-15T12:00:00.000Z',
    listId: 1,
  },
];

const ListPage: React.FC = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const listName = 'Completed';
  const listDescription = 'A collection of completed games.';
  const gamesCount = 2;

  return (
    <>
      <Box mb="md">
        <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Text size="xl" fw={700}>
            {listName}
          </Text>
          <Button variant="outline" style={{ marginLeft: '10px' }}>
            {t('lists.edit_list_button')}
          </Button>
        </Box>

        <Text>{listDescription}</Text>
      </Box>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>
          {gamesCount} {/*Games*/}
        </Text>
        <DisplayModeSelector value={viewMode} onChange={setViewMode} />
      </Box>
      <Divider mb="md" />
      <Box>
        {viewMode === 'list' ? (
          <GamesItemView games={testGames} onGameClick={() => {}} />
        ) : (
          <GamesCardView games={testGames} onGameClick={() => {}} />
        )}
      </Box>
    </>
  );
};

export default ListPage;
