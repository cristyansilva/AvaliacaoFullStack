import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', tipo: 'aluno' });
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await api.post('/api/registro', form);
      navigate('/login', { replace: true, state: { mensagem: 'Cadastro realizado. Entre com sua conta.' } });
    } catch (error) {
      setErro(error.response?.data?.mensagem || error.message || 'Não foi possível cadastrar. Verifique os dados e a conexão.');
    } finally { setEnviando(false); }
  }

  const alterar = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return (
    <section className="pagina-solicitar">
      <header className="cabecalho-pagina"><span className="cabecalho-pagina__tag">Cadastro</span><h1>Criar uma conta</h1><p>Cadastre-se para acessar a plataforma.</p></header>
      <form className="form-solicitacao" onSubmit={handleSubmit}>
        {erro && <div className="alerta alerta--erro" role="alert">{erro}</div>}
        <div className="form-campo"><label htmlFor="cadastro-nome">Nome</label><input id="cadastro-nome" className="input-custom" name="nome" required value={form.nome} onChange={alterar} /></div>
        <div className="form-campo"><label htmlFor="cadastro-email">E-mail</label><input id="cadastro-email" className="input-custom" name="email" type="email" required value={form.email} onChange={alterar} /></div>
        <div className="form-campo"><label htmlFor="cadastro-senha">Senha</label><input id="cadastro-senha" className="input-custom" name="senha" type="password" minLength="6" required value={form.senha} onChange={alterar} /></div>
        <div className="form-campo"><label htmlFor="cadastro-tipo">Perfil</label><select id="cadastro-tipo" className="select-custom" name="tipo" value={form.tipo} onChange={alterar}><option value="aluno">Aluno</option><option value="monitor">Monitor</option></select></div>
        <div className="form-solicitacao__acoes"><button className="btn-enviar" type="submit" disabled={enviando}>{enviando ? 'Cadastrando…' : 'Cadastrar'}</button></div>
        <p>Já tem conta? <Link to="/login">Entrar</Link>.</p>
      </form>
    </section>
  );
}
