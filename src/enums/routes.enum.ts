export enum Routes {
  HOME = '/',
  GAMES = '/games',
  GAME = '/game',
  PROFILE = '/profile',
  LISTS = '/lists',
  LIST = '/list',
  CREATE_LIST = '/create-list',
  FORGOT_PASSWORD = '/forgot-password',
  CONFIRM_EMAIL = '/confirm-email',
  LOGIN = '/login',
  REGISTER = '/register',
}

export const getGameRoute = (id: string) => `${Routes.GAME}/${id}`;
export const getListRoute = (id: string) => `${Routes.LIST}/${id}`;
