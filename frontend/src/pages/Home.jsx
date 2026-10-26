import { useState } from 'react';
import CardMonitoria from '../components/CardMonitoria/CardMonitoria';
import FiltroBar from '../components/FiltroBar/FiltroBar';
import Icon from '../components/Icon/Icon';
import {
  filtrarMonitorias,
  calcularEstatisticasMonitorias
} from '../utils/helpers';

/**
 * Página Principal (Dashboard de Monitorias)
 * Requisitos Aula 04:
 * - useState gerenciando lista, filtros, contadores e inscrições ativas
 * - Renderização de listas com map() e key
 * - Integração dos componentes reutilizáveis
 */
export default function Home({ monitorias, onAtualizarMonitorias }) {
  // Estados para controle dos filtros
  const [busca, setBusca] = useState('');
  const [disciplina, setDisciplina] = useState('Todas as Disciplinas');
  const [tipo, setTipo] = useState('Todos');

  // Estado para armazenar os IDs das monitorias em que o usuário se inscreveu
  const [inscricoesUsuario, setInscricoesUsuario] = useState([]);
  const [notificacao, setNotificacao] = useState(null);

  // Aplicação da função de filtro de JS
  const monitoriasFiltradas = filtrarMonitorias(monitorias, busca, disciplina, tipo);

  // Cálculo das estatísticas do painel
  const estatisticas = calcularEstatisticasMonitorias(monitorias);

  const handleLimparFiltros = () => {
    setBusca('');
    setDisciplina('Todas as Disciplinas');
    setTipo('Todos');
  };

  // Interação com useState: inscrição e cancelamento dinâmico
  const handleToggleInscricao = (idMonitoria) => {
    const jaInscrito = inscricoesUsuario.includes(idMonitoria);

    if (jaInscrito) {
      // Cancelar inscrição: incrementa vaga de volta
      setInscricoesUsuario((prev) => prev.filter((id) => id !== idMonitoria));
      onAtualizarMonitorias((prev) =>
        prev.map((item) =>
          item.id === idMonitoria
            ? {
                ...item,
                vagasDisponiveis: item.vagasDisponiveis + 1,
                status: 'Disponível'
              }
            : item
        )
      );
      exibirNotificacao('Inscrição cancelada. A vaga voltou a ficar disponível.', 'info');
    } else {
      // Realizar inscrição: decrementa vaga
      const itemAlvo = monitorias.find((m) => m.id === idMonitoria);
      if (!itemAlvo || itemAlvo.vagasDisponiveis <= 0) {
        exibirNotificacao('Não há vagas disponíveis para esta sessão.', 'erro');
        return;
      }

      setInscricoesUsuario((prev) => [...prev, idMonitoria]);
      onAtualizarMonitorias((prev) =>
        prev.map((item) => {
          if (item.id === idMonitoria) {
            const novasVagas = item.vagasDisponiveis - 1;
            return {
              ...item,
              vagasDisponiveis: novasVagas,
              status: novasVagas === 0 ? 'Esgotado' : item.status
            };
          }
          return item;
        })
      );
      exibirNotificacao(`Vaga reservada em ${itemAlvo.disciplina}.`, 'sucesso');
    }
  };

  const exibirNotificacao = (texto, tipo) => {
    setNotificacao({ texto, tipo });
    setTimeout(() => setNotificacao(null), 4500);
  };

  return (
    <div className="pagina-home">
      {/* Cabeçalho da página */}
      <section className="hero-banner">
        <div className="hero-banner__conteudo">
          <span className="hero-banner__tag">Projeto Integrador III · ADS FMP</span>
          <h1>Monitorias acadêmicas</h1>
          <p>
            Encontre uma sessão com monitores de Análise e Desenvolvimento de Sistemas,
            reserve sua vaga e acompanhe suas inscrições em um só lugar.
          </p>
        </div>
        <ul className="hero-banner__badges">
          <li>ODS 4 · Educação de Qualidade</li>
          <li>Presencial e remoto</li>
          <li>Individual ou em grupo</li>
        </ul>
      </section>

      {/* Faixa de métricas (Flexbox + Box Model) */}
      <section className="metricas-grid" aria-label="Resumo do semestre">
        <div className="card-metrica">
          <span className="card-metrica__numero">{estatisticas.totalMonitorias}</span>
          <span className="card-metrica__rotulo">Sessões oferecidas</span>
        </div>
        <div className="card-metrica">
          <span className="card-metrica__numero">{estatisticas.totalVagasDisponiveis}</span>
          <span className="card-metrica__rotulo">Vagas abertas</span>
        </div>
        <div className="card-metrica">
          <span className="card-metrica__numero">{estatisticas.totalDisciplinasDistintas}</span>
          <span className="card-metrica__rotulo">Disciplinas atendidas</span>
        </div>
        <div className="card-metrica card-metrica--destaque">
          <span className="card-metrica__numero">{inscricoesUsuario.length}</span>
          <span className="card-metrica__rotulo">Suas inscrições</span>
        </div>
      </section>

      {/* Feedback de ação */}
      {notificacao && (
        <div className={`alerta alerta--${notificacao.tipo}`} role="alert">
          <Icon name={notificacao.tipo === 'erro' ? 'alerta' : 'confirmado'} size={18} />
          <span>{notificacao.texto}</span>
        </div>
      )}

      {/* Barra de Filtro com interação controlada */}
      <FiltroBar
        busca={busca}
        onBuscaChange={setBusca}
        disciplina={disciplina}
        onDisciplinaChange={setDisciplina}
        tipo={tipo}
        onTipoChange={setTipo}
        onLimparFiltros={handleLimparFiltros}
        totalEncontrados={monitoriasFiltradas.length}
      />

      {/* Listagem de Monitorias com .map() e key */}
      <section className="secao-monitorias">
        <h2 className="secao-titulo">Próximas sessões</h2>

        {monitoriasFiltradas.length === 0 ? (
          <div className="estado-vazio">
            <p>Nenhuma sessão encontrada para os filtros selecionados.</p>
            <button type="button" className="btn-limpar" onClick={handleLimparFiltros}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid-monitorias">
            {monitoriasFiltradas.map((monitoria) => (
              <CardMonitoria
                key={monitoria.id}
                monitoria={monitoria}
                onInscrever={handleToggleInscricao}
                isInscrito={inscricoesUsuario.includes(monitoria.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
