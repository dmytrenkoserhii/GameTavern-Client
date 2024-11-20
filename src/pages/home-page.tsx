import { useTranslation } from 'react-i18next';
import { GiGamepad } from 'react-icons/gi';
import { MdList } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Button, Container, Group, Image, Paper, Stack, Text } from '@mantine/core';

import homeImg from '@/assets/home.png';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container size="md" mt="xl">
      <Paper radius="md" p="xl" withBorder>
        <Stack align="center" gap="xl">
          <Image height={50} src={homeImg} alt="home" radius="md" />

          <Text size="xl" c="dimmed" ta="center" maw={600}>
            {t('home.description')}
          </Text>

          <Group gap="md">
            <Button
              component={Link}
              to="/games"
              size="lg"
              leftSection={<GiGamepad size={24} />}
              variant="outline"
            >
              {t('home.gamesButton')}
            </Button>

            <Button
              component={Link}
              to="/lists"
              size="lg"
              color="secondary"
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

export default HomePage;
