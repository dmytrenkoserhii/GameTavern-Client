import { BsChatDots } from 'react-icons/bs';
import { TiUserDeleteOutline } from 'react-icons/ti';

import { Box, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';

const FriendPage = () => {
  return (
    <Stack>
      <Group align="center">
        <Box>
          <Title order={2}>Username</Title>
          <Text c="dimmed">First name | Last name</Text>
        </Box>

        <Group gap="xs">
          <Button color="blue" variant="subtle" leftSection={<BsChatDots size={16} />}>
            Send message
          </Button>
          <Button color="red" variant="subtle" leftSection={<TiUserDeleteOutline size={16} />}>
            Unfollow
          </Button>
        </Group>
      </Group>

      <Paper withBorder p="sm">
        <Text>Friend's other user info</Text>
      </Paper>

      <Paper withBorder p="sm">
        <Text>Friend's favorite games</Text>
      </Paper>

      <Paper withBorder p="sm">
        <Text>Friend's lists that he marked as visible</Text>
      </Paper>

      <Paper withBorder p="sm">
        <Text>Friend's friends</Text>
      </Paper>
    </Stack>
  );
};

export default FriendPage;
