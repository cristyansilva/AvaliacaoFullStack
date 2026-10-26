import { useState, useEffect } from 'react';
import axios from 'axios';
import Badge from '../components/Badge/Badge';
import Icon from '../components/Icon/Icon';

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
            dataPublicacao: `${String((index % 28) + 1).padStart(2, "0")}/09/2026`
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
        <span className="cabecalho-pagina__tag">Comunidade</span>
        <h1>Fórum da comunidade</h1>
        <p>
          Dúvidas e dicas compartilhadas entre monitores e acadêmicos de ADS.
          As publicações são carregadas de uma API REST pública via Axios.
        </p>
      </header>

      {/* Barra de pesquisa nos dados da API */}
      <div className="painel-filtro-monitores">
        <label htmlFor="busca-comunidade">Buscar</label>
        <div className="campo-com-icone">
          <Icon name="busca" />
          <input
            id="busca-comunidade"
            type="search"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            placeholder="Título, conteúdo ou categoria"
            className="input-custom"
          />
        </div>
        <span className="texto-contagem">
          {publicacoesFiltradas.length} {publicacoesFiltradas.length === 1 ? 'publicação' : 'publicações'}
        </span>
      </div>

      {/* Tratamento de Estados: Carregando, Erro e Sucesso */}
      {carregando && (
        <div className="estado-carregando" role="status">
          <div className="spinner"></div>
          <p>Carregando publicações…</p>
        </div>
      )}

      {erro && (
        <div className="alerta alerta--erro" role="alert">
          <Icon name="alerta" size={18} />
          <span>{erro}</span>
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
                  <span className="card-post-api__autor"><Icon name="usuario" />{item.autor}</span>
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
                    <span><Icon name="calendario" size={14} />{item.dataPublicacao}</span>
                    <span><Icon name="mensagem" size={14} />{item.respostasCount} respostas</span>
                  </div>

                  <button
                    type="button"
                    className={`btn-curtir ${curtidasAtuais > 0 ? 'btn-curtir--ativo' : ''}`}
                    onClick={() => handleCurtir(item.id)}
                  >
                    <Icon name="coracao" size={14} />
                    {curtidasAtuais > 0 ? `${curtidasAtuais} ${curtidasAtuais === 1 ? 'curtida' : 'curtidas'}` : 'Curtir'}
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
