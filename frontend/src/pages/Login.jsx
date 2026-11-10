import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mensagem = location.state?.mensagem;

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await login(email, senha);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error) {
      setErro(error.response?.data?.mensagem || error.message || 'Não foi possível entrar. Confira a conexão e suas credenciais.');
    } finally { setEnviando(false); }
  }

  return (
    <section className="pagina-solicitar">
      <header className="cabecalho-pagina"><span className="cabecalho-pagina__tag">Acesso</span><h1>Entrar no Monitoria Flow</h1><p>Use seu e-mail e senha cadastrados.</p></header>
      <form className="form-solicitacao" onSubmit={handleSubmit}>
        {mensagem && <div className="alerta alerta--sucesso" role="status">{mensagem}</div>}
        {erro && <div className="alerta alerta--erro" role="alert">{erro}</div>}
        <div className="form-campo"><label htmlFor="login-email">E-mail</label><input id="login-email" className="input-custom" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="form-campo"><label htmlFor="login-senha">Senha</label><input id="login-senha" className="input-custom" type="password" autoComplete="current-password" required value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
        <div className="form-solicitacao__acoes"><button className="btn-enviar" type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button></div>
        <p>Primeiro acesso? <Link to="/cadastro">Cadastre sua conta</Link>.</p>
      </form>
    </section>
  );
}
