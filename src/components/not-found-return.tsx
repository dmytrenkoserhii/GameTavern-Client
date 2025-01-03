import React from 'react';

import { Box, Button, Text, Title } from '@mantine/core';

interface NotFoundReturnProps {
  titleText: string;
  descriptionText?: string;
  buttonText: string;
  onClick: () => void;
}

export const NotFoundReturn: React.FC<NotFoundReturnProps> = ({
  titleText,
  descriptionText,
  buttonText,
  onClick,
}) => {
  return (
    <Box p="xl" style={{ textAlign: 'center' }}>
      <Title order={2}>{titleText}</Title>
      {descriptionText && <Text>{descriptionText}</Text>}

      <Button onClick={onClick} mt="md">
        {buttonText}
      </Button>
    </Box>
  );
};
