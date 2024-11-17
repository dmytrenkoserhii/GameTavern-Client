import { useTranslation } from 'react-i18next';
import { GiGamepad } from 'react-icons/gi';
import { MdList } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Button, Container, Group, Paper, Stack, Text } from '@mantine/core';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container size="md" mt="xl">
      <Paper radius="md" p="xl" withBorder>
        <Stack align="center" gap="xl">
          <Text size="xl" c="dimmed" ta="center" maw={600}>
            {t('home.description')}
          </Text>
          <Group gap="md">
            <Button
              component={Link}
              to="/games"
              size="lg"
              leftSection={<GiGamepad size={24} />}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              {t('home.gamesButton')}
            </Button>

            <Button
              component={Link}
              to="/lists"
              size="lg"
              variant="outline"
              leftSection={<MdList size={24} />}
            >
              {t('home.listsButton')}
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};
