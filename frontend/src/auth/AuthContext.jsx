import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('monitoria-token'));
  const [usuario, setUsuario] = useState(() => {
    try { return JSON.parse(localStorage.getItem('monitoria-usuario')); }
    catch { return null; }
  });

  const login = useCallback(async (email, senha) => {
    const { data } = await api.post('/api/login', { email, senha });
    setToken(data.token);
    setUsuario(data.usuario);
    localStorage.setItem('monitoria-token', data.token);
    localStorage.setItem('monitoria-usuario', JSON.stringify(data.usuario));
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('monitoria-token');
    localStorage.removeItem('monitoria-usuario');
  }, []);

  const value = useMemo(() => ({ token, usuario, login, logout }), [token, usuario, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
