import { FaRegMoon, FaRegSun } from 'react-icons/fa6';

import { Switch, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core';

export const ThemeSelector = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const sunIcon = (
    <FaRegSun style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[4]} />
  );

  const moonIcon = (
    <FaRegMoon style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
  );

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={colorScheme === 'dark'}
      onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
    />
  );
};
