import { useState, useCallback, useEffect } from 'react';

const localStorageName = 'user';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      localStorageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback((jwtToken, id) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(localStorageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localStorageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
