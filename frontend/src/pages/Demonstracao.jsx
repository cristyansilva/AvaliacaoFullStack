import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../auth/AuthContext';

export default function Demonstracao() {
  const { token, usuario } = useAuth();
  const [checagem, setChecagem] = useState({ estado: 'inicial', mensagem: '' });
  const apiConfigurada = Boolean(import.meta.env.VITE_API_URL);

  async function testarApi() {
    setChecagem({ estado: 'carregando', mensagem: '' });
    try {
      const resposta = await api.get('/api/monitorias');
      const quantidade = Array.isArray(resposta.data) ? resposta.data.length : 0;
      setChecagem({
        estado: 'sucesso',
        mensagem: `Conexão OK (HTTP ${resposta.status}). A API retornou ${quantidade} ${quantidade === 1 ? 'monitoria' : 'monitorias'}.`
      });
    } catch (error) {
      setChecagem({
        estado: 'erro',
        mensagem: error.response
          ? `A API respondeu com HTTP ${error.response.status}: ${error.response.data?.mensagem || 'erro na requisição.'}`
          : error.message || 'Não foi possível conectar à API.'
      });
    }
  }

  return (
    <section className="pagina-comunidade">
      <header className="cabecalho-pagina">
        <span className="cabecalho-pagina__tag">Gravação · Integrante 4</span>
        <h1>Demonstração da integração</h1>
        <p>Confira a conexão com a API do Render e percorra os passos principais do login JWT.</p>
      </header>

      <div className="grid-publicacoes">
        <article className="card-post-api">
          <h2 className="card-post-api__titulo">API configurada</h2>
          <p>{apiConfigurada ? 'VITE_API_URL está definida para este ambiente.' : 'VITE_API_URL não está definida. Configure frontend/.env.local e reinicie o Vite.'}</p>
          <button type="button" className="btn-enviar" onClick={testarApi} disabled={!apiConfigurada || checagem.estado === 'carregando'}>
            {checagem.estado === 'carregando' ? 'Testando conexão…' : 'Testar conexão com a API'}
          </button>
          {checagem.mensagem && <p className="card-post-api__corpo" role={checagem.estado === 'erro' ? 'alert' : 'status'}>{checagem.mensagem}</p>}
        </article>

        <article className="card-post-api">
          <h2 className="card-post-api__titulo">Contexto de autenticação</h2>
          <p><strong>Estado:</strong> {token ? 'Autenticado' : 'Sem sessão'}</p>
          <p><strong>Usuário:</strong> {usuario?.nome || 'Nenhum usuário logado'}</p>
          <p>O JWT fica guardado no Context API e no armazenamento local. O token não é exibido na tela.</p>
          <Link className="btn-limpar" to={token ? '/' : '/login'}>{token ? 'Abrir área protegida' : 'Ir para o login'}</Link>
        </article>
      </div>

      <section className="secao-monitorias">
        <h2 className="secao-titulo">Percurso para o vídeo</h2>
        <ol className="roteiro-demonstracao">
          <li><strong>API pública:</strong> clique em “Testar conexão com a API” e mostre o status da resposta.</li>
          <li><strong>Proteção:</strong> saia da conta e abra <Link to="/">a página inicial</Link>; a aplicação deve encaminhar para o login.</li>
          <li><strong>Login JWT:</strong> entre com uma conta cadastrada e mostre o nome na barra superior.</li>
          <li><strong>Dados reais:</strong> abra a <Link to="/monitorias-api">lista de monitorias da API</Link> e mostre os itens renderizados.</li>
          <li><strong>Código:</strong> mostre <code>AuthContext.jsx</code>, <code>RequireAuth.jsx</code> e os <code>useNavigate</code> do login e cadastro.</li>
        </ol>
        <p className="texto-contagem">Dica: para demonstrar o redirecionamento sem sessão, use uma janela anônima ou clique em “Sair” antes de abrir a página inicial.</p>
      </section>
    </section>
  );
}
