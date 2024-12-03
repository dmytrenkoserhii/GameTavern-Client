export const getCurrentQueryParams = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams.entries());
};
