import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Button, Divider, Text } from '@mantine/core';

import { ViewMode } from '@/types';

import { DisplayModeSelector, ListCardView, ListsItemView } from '../components';

const ListsPage: React.FC = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const listCount = 87;

  const testLists = [
    { id: 1, title: 'My List 1', gamesCount: 87 },
    { id: 2, title: 'My List 2', gamesCount: 86 },
    { id: 3, title: 'My List 3', gamesCount: 85 },
    { id: 4, title: 'My List 4', gamesCount: 84 },
    { id: 5, title: 'My List 5', gamesCount: 83 },
  ];

  const handleListClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('list:', id);
  };

  return (
    <>
      <Box mb="md">
        <Button variant="filled">{t('lists.create_list')}</Button>
      </Box>
      <Box mb="xs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Text>
          {listCount} {/*Lists*/}
        </Text>
        <DisplayModeSelector value={viewMode} onChange={(value) => setViewMode(value)} />
      </Box>
      <Divider mb="md" />
      <Box>
        {viewMode === 'list' ? (
          <ListsItemView lists={testLists} onListClick={handleListClick} />
        ) : (
          <ListCardView lists={testLists} onListClick={handleListClick} />
        )}
      </Box>
    </>
  );
};

export default ListsPage;
