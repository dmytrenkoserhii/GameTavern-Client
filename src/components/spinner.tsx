import React from 'react';

import { Center, Loader } from '@mantine/core';

export const Spinner: React.FC = () => {
  return (
    <Center style={{ height: '100dvh' }}>
      <Loader size="xl" />
    </Center>
  );
};
