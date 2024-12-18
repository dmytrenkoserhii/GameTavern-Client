export const getErrorMessage = (error: { message?: string }) => {
  if (typeof error.message === 'string') {
    return error.message;
  }

  return 'Something went wrong!';
};
