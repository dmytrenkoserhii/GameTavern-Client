export enum Routes {
  HOME = '/',
  GAMES = '/games',
  GAME = '/games/',
  LISTS = '/lists',
  LIST = '/lists/',
  CREATE_LIST = '/create-list',
  FRIENDS = '/friends',
  MESSAGES = '/messages',
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

export const getGameRoute = (id: string) => `${Routes.GAME}${id}`;
export const getListRoute = (id: string) => `${Routes.LIST}${id}`;
