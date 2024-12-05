import React from 'react';

import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';

import { getCurrentQueryParams, removeObjectEmptyProperties } from '@/utils';

export const useQueryParams = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: T = React.useMemo(() => {
    return getCurrentQueryParams(searchParams) as T;
  }, [searchParams]);

  const updateQueryParams = React.useCallback(
    (params: T) => {
      const updatedParams: T = {
        ...queryParams,
        ...params,
      };

      const cleanedParams: T = removeObjectEmptyProperties(updatedParams);

      setSearchParams(cleanedParams as ParamKeyValuePair[], {
        replace: true,
      });
    },
    [queryParams, setSearchParams],
  );

  return { queryParams, updateQueryParams };
};
