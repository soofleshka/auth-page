import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { ToastCompanent } from './Toast';
import { useMessage } from '../hooks/message.hook';
import { useAuth } from '../hooks/auth.hook';
import { AuthorizedForm } from './AuthorizedForm';
import { UnauthorizedForm } from './UnauthorizedForm';

const AuthPage = () => {
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, logout, token, userId } = useAuth();
  const isAuthorized = !!token;

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  function changeFormHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function registerHandler() {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      login(data.token, data.userID);
    } catch (e) {}
  }

  async function loginHandler() {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      login(data.token, data.userID);
    } catch (e) {}
  }

  function logoutHandler() {
    logout();
  }

  return (
    <div className="container">
      {isAuthorized ? (
        <AuthorizedForm
          logoutHandler={logoutHandler}
          loading={loading}
          userId={userId}
        />
      ) : (
        <UnauthorizedForm
          changeFormHandler={changeFormHandler}
          registerHandler={registerHandler}
          loginHandler={loginHandler}
          loading={loading}
        />
      )}
      <ToastCompanent />
    </div>
  );
};

export default AuthPage;
