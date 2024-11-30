export enum Routes {
  HOME = '/',
  GAMES = '/games',
  GAME = '/games/',
  LISTS = '/lists',
  LIST = '/lists/',
  CREATE_LIST = '/create-list',
  FRIENDS = '/friends',
  FRIEND = '/friends/',
  CHATS = '/chats',
  CHAT = '/chats/',
  GUILD = '/guild',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  CONFIRM_EMAIL = '/confirm-email',
  VERIFY_EMAIL = '/verify-email',
  LOGIN = '/login',
  REGISTER = '/register',
  SUBSCRIPTION = '/subscription',
}

export const getGameRoute = (id: number) => `${Routes.GAME}${id}`;
export const getListRoute = (id: number) => `${Routes.LIST}${id}`;
export const getFriendRoute = (id: number) => `${Routes.FRIEND}${id}`;
export const getChatRoute = (id: number) => `${Routes.CHAT}${id}`;
