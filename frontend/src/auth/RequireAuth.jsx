import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login', { replace: true, state: { from: location } });
  }, [token, navigate, location]);

  return token ? <Outlet /> : null;
}
