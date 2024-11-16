export enum Routes {
  HOME = '/',
  GAMES = '/games',
  GAME = '/game',
  LISTS = '/lists',
  LIST = '/list',
  CREATE_LIST = '/create-list',
  FRIENDS = '/friends',
  MESSAGES = '/messages',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  FORGOT_PASSWORD = '/forgot-password',
  CONFIRM_EMAIL = '/confirm-email',
  LOGIN = '/login',
  REGISTER = '/register',
  SUBSCRIPTION = '/subscription',
}

export const getGameRoute = (id: string) => `${Routes.GAME}/${id}`;
export const getListRoute = (id: string) => `${Routes.LIST}/${id}`;
