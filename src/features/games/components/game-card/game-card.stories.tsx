import type { Meta, StoryObj } from '@storybook/react';

import { GameCard } from './game-card';

const meta: Meta<typeof GameCard> = {
  title: 'Components/GameCard',
  component: GameCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GamesPageCard: Story = {
  args: {
    game: {
      id: 1,
      guid: '123',
      name: 'The Witcher 3',
      deck: 'An amazing RPG',
      image: {
        icon_url: '',
        medium_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
        screen_url: '',
        screen_large_url: '',
        small_url: '',
        super_url: '',
        thumb_url: '',
        tiny_url: '',
        original_url: '',
      },
      platforms: [],
      genres: [],
      developers: [],
      createdAt: '2024-03-20',
      updatedAt: '2024-03-20',
      listId: 1,
    },
  },
};

export const ListPageCard: Story = {
  args: {
    game: {
      id: 2,
      gameApiId: 123,
      name: 'Cyberpunk 2077',
      coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4hk8.jpg',
      orderNumber: 1,
      listId: 1,
    },
    listId: 1,
    isEditing: true,
  },
};
