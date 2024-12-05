import React from 'react';

import { useSearchParams } from 'react-router-dom';

import { BaseQueryParams } from '@/features/lists';
import { getCurrentQueryParams, removeObjectEmptyProperties } from '@/utils';

export const useQueryParams = <T extends BaseQueryParams>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = React.useMemo(() => {
    return getCurrentQueryParams(searchParams) as T;
  }, [searchParams]);

  const updateQueryParams = React.useCallback(
    (data: Partial<T>) => {
      const updatedParams = {
        ...queryParams,
        ...data,
      };

      const cleanedParams = removeObjectEmptyProperties(updatedParams);
      setSearchParams(new URLSearchParams(cleanedParams as Record<string, string>), {
        replace: true,
      });
    },
    [queryParams, setSearchParams],
  );

  return { queryParams, updateQueryParams };
};
