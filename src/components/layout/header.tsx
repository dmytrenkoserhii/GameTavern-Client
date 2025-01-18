import React from 'react';

import { useTranslation } from 'react-i18next';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Autocomplete, Button, Group, Image } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { useQuery } from '@tanstack/react-query';

import logo from '@/assets/logo.png';
import { QueryKeys } from '@/enums';
import { Routes, getGameRoute } from '@/enums/routes.enum';
import { GamesApiService } from '@/features/games-api';
import { User, UsersService } from '@/features/user';

import { LanguageSelector } from '../language-selector';
import { ThemeSelector } from '../theme-selector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const navigate = useNavigate();
  const location = useLocation();
  const autocompleteRef = React.useRef<HTMLInputElement>(null);

  const { data: user } = useQuery<User>({
    queryKey: [QueryKeys.USER],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const { data: searchedGames } = useQuery({
    queryKey: [QueryKeys.SEARCHED_GAMES, debouncedSearch],
    queryFn: () =>
      GamesApiService.getAllGames({
        page: '1',
        limit: '10',
        name: debouncedSearch,
      }),
    enabled: debouncedSearch.length >= 4,
  });

  React.useEffect(() => {
    setSearch('');
  }, [location.pathname]);

  let headerContent: React.ReactNode;
  if (user) {
    headerContent = (
      <Group flex={1} justify="space-between" ml="xl">
        <Autocomplete
          ref={autocompleteRef}
          value={search}
          onChange={setSearch}
          placeholder={t('header.search')}
          leftSection={<BsFillSearchHeartFill size={16} />}
          data={(searchedGames?.games ?? []).map((game) => ({
            value: game.name,
            label: game.name,
          }))}
          w={300}
          onOptionSubmit={(selectedName) => {
            const selectedGame = searchedGames?.games.find((game) => game.name === selectedName);
            autocompleteRef.current?.blur();
            if (selectedGame) {
              navigate(getGameRoute(selectedGame.id.toString()));
            }
          }}
        />
      </Group>
    );
  } else {
    headerContent = (
      <Group>
        <Button component={Link} to={Routes.LOGIN}>
          {t('general.sign_in')}
        </Button>
      </Group>
    );
  }

  return (
    <Group justify="space-between" py="sm" wrap="nowrap" flex={1}>
      <Link to={Routes.HOME}>
        <Image height={50} src={logo} alt="logo" />
      </Link>

      <Group>
        {headerContent}

        <LanguageSelector />
        <ThemeSelector />
      </Group>
    </Group>
  );
};
