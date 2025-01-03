import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

interface UseRedirectTimerProps {
  route?: string;
  timeout?: number;
}

export const useRedirectTimer = ({ route, timeout = 5 }: UseRedirectTimerProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = React.useState(timeout);
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>();

  const handleNavigate = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (route) {
      navigate({
        pathname: route,
        search: location.search,
      });
    } else {
      navigate(-1);
    }
  }, [navigate, route, location.search]);

  const startRedirectTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCountdown(timeout);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleNavigate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeout, handleNavigate]);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { handleNavigate, startRedirectTimer, countdown };
};
