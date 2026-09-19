import { useState, useEffect } from 'react';
import axios from 'axios';
import Badge from '../components/Badge/Badge';

/**
 * REQUISITO AULA 05: Consumo de API Pública com Axios
 * - Requisição GET com axios
 * - Gerenciamento de ciclo de vida com useEffect
 * - Estados controlados com useState (dados, loading, erro e interações)
 * - Renderização de listas com map() e key
 *
 * Mapeamento de Domínio:
 * Consome a API pública do JSONPlaceholder para simular a Comunidade Acadêmica
 * de Dúvidas e Fórum Colaborativo de Alunos do Monitoria Flow.
 */
// Categorias acadêmicas simuladas para enriquecer os dados recebidos da API
const CATEGORIAS_ACADEMICAS = [
  'Algoritmos',
  'Estruturas de Dados',
  'Banco de Dados',
  'React & Web',
  'Engenharia de Software',
  'Carreira & Dicas'
];

export default function ComunidadeApi() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [curtidas, setCurtidas] = useState({});

  // REQUISITO AULA 05: useEffect disparando requisição GET via axios
  useEffect(() => {
    let montado = true;

    async function buscarPublicacoesApi() {
      try {
        setCarregando(true);
        setErro(null);

        // Chamada à API pública externa
        const resposta = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=9');

        if (montado) {
          // Enriquece os dados da API pública com metadados acadêmicos do Monitoria Flow
          const publicacoesFormatadas = resposta.data.map((item, index) => ({
            id: item.id,
            titulo: item.title,
            conteudo: item.body,
            autor: `Acadêmico #${item.userId}`,
            categoria: CATEGORIAS_ACADEMICAS[index % CATEGORIAS_ACADEMICAS.length],
            respostasCount: (item.id * 3) % 11 + 1,
            dataPublicacao: `${(index % 28) + 1}/09/2026`
          }));

          setPublicacoes(publicacoesFormatadas);
          setCarregando(false);
        }
      } catch (err) {
        if (montado) {
          console.error('Erro ao buscar dados da API pública:', err);
          setErro('Não foi possível carregar as publicações da comunidade acadêmica no momento.');
          setCarregando(false);
        }
      }
    }

    buscarPublicacoesApi();

    return () => {
      montado = false;
    };
  }, []);

  // Interação controlada com useState: dar like na publicação
  const handleCurtir = (id) => {
    setCurtidas((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Filtragem dos dados obtidos da API
  const publicacoesFiltradas = publicacoes.filter((item) => {
    const termo = filtroTexto.toLowerCase();
    return (
      item.titulo.toLowerCase().includes(termo) ||
      item.conteudo.toLowerCase().includes(termo) ||
      item.categoria.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="pagina-comunidade">
      <header className="cabecalho-pagina">
        <span className="cabecalho-pagina__tag">Requisito Aula 05 • Consumo de API Externa</span>
        <h1>Fórum & Dicas da Comunidade Acadêmica</h1>
        <p>
          Espaço integrado para troca de conhecimentos entre monitores e acadêmicos de ADS.
          Os dados desta seção são sincronizados dinamicamente a partir de uma <strong>API REST pública</strong> utilizando <strong>Axios</strong>.
        </p>
      </header>

      {/* Barra de pesquisa nos dados da API */}
      <div className="painel-filtro-monitores">
        <label htmlFor="busca-comunidade">Pesquisar tópicos do fórum:</label>
        <input
          id="busca-comunidade"
          type="text"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          placeholder="Ex: react, dados, algoritmos..."
          className="input-custom"
          style={{ maxWidth: '380px' }}
        />
        <span className="texto-contagem">
          Exibindo {publicacoesFiltradas.length} publicações
        </span>
      </div>

      {/* Tratamento de Estados: Carregando, Erro e Sucesso */}
      {carregando && (
        <div className="estado-carregando">
          <div className="spinner"></div>
          <p>Consultando API pública externa via Axios...</p>
        </div>
      )}

      {erro && (
        <div className="alerta alerta--erro" role="alert">
          <strong>Aviso:</strong> {erro}
        </div>
      )}

      {!carregando && !erro && (
        <div className="grid-publicacoes">
          {/* REQUISITO AULA 05: Renderização com map() e key */}
          {publicacoesFiltradas.map((item) => {
            const curtidasAtuais = curtidas[item.id] || 0;
            return (
              <article key={item.id} className="card-post-api">
                <div className="card-post-api__topo">
                  <span className="card-post-api__autor">👤 {item.autor}</span>
                  <Badge variant="info">{item.categoria}</Badge>
                </div>

                <h3 className="card-post-api__titulo">
                  {item.titulo.charAt(0).toUpperCase() + item.titulo.slice(1)}
                </h3>

                <p className="card-post-api__corpo">
                  {item.conteudo}
                </p>

                <div className="card-post-api__rodape">
                  <div className="card-post-api__meta">
                    <span>📅 {item.dataPublicacao}</span>
                    <span>💬 {item.respostasCount} respostas</span>
                  </div>

                  <button
                    type="button"
                    className="btn-curtir"
                    onClick={() => handleCurtir(item.id)}
                    aria-label="Curtir publicação"
                  >
                    ❤️ {curtidasAtuais > 0 ? `${curtidasAtuais} Curtidas` : 'Curtir'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
