import { BsChatDots } from 'react-icons/bs';
import { FaGamepad, FaUser } from 'react-icons/fa';
import { GiCastle, GiScrollUnfurled } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { MdGroups } from 'react-icons/md';
import { RiHandCoinFill } from 'react-icons/ri';

import { Routes } from '@/enums/routes.enum';
import { NavbarLink } from '@/types';

export const NAVBAR_LINKS: NavbarLink[] = [
  {
    to: Routes.GAMES,
    translationLabel: 'navbar.games_link',
    icon: <FaGamepad />,
  },
  {
    to: Routes.LISTS,
    translationLabel: 'navbar.lists_link',
    icon: <GiScrollUnfurled />,
  },
  {
    to: Routes.FRIENDS,
    translationLabel: 'navbar.friends_link',
    icon: <MdGroups />,
    isPremium: true,
  },
  {
    to: Routes.CHATS,
    translationLabel: 'navbar.chats_link',
    icon: <BsChatDots />,
    isPremium: true,
  },
  {
    to: Routes.GUILD,
    translationLabel: 'navbar.guild_link',
    icon: <GiCastle />,
    isPremium: true,
  },
  {
    to: Routes.PROFILE,
    translationLabel: 'navbar.profile_link',
    icon: <FaUser />,
  },
  {
    to: Routes.SETTINGS,
    translationLabel: 'navbar.settings_link',
    icon: <IoMdSettings />,
  },
  {
    to: Routes.SUBSCRIPTION,
    translationLabel: 'navbar.subscription_link',
    icon: <RiHandCoinFill />,
  },
];
