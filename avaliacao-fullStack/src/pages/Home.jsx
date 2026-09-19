import { useState } from 'react';
import CardMonitoria from '../components/CardMonitoria/CardMonitoria';
import FiltroBar from '../components/FiltroBar/FiltroBar';
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
      exibirNotificacao('Inscrição cancelada com sucesso.', 'info');
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
      exibirNotificacao(`Parabéns! Vaga reservada para a monitoria de ${itemAlvo.disciplina}!`, 'sucesso');
    }
  };

  const exibirNotificacao = (texto, tipo) => {
    setNotificacao({ texto, tipo });
    setTimeout(() => setNotificacao(null), 4500);
  };

  return (
    <div className="pagina-home">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-banner__conteudo">
          <span className="hero-banner__tag">Projeto Integrador III • ADS FMP</span>
          <h1>Plataforma de Monitorias Acadêmicas</h1>
          <p>
            O <strong>Monitoria Flow</strong> simplifica o apoio aos estudantes de Análise e
            Desenvolvimento de Sistemas, conectando monitores experientes a alunos que desejam
            superar desafios e evoluir na programação.
          </p>
          <div className="hero-banner__badges">
            <span>🎯 ODS 4 - Educação de Qualidade</span>
            <span>👥 Atendimento Presencial e Remoto</span>
            <span>⚡ Agendamento Simplificado</span>
          </div>
        </div>
      </section>

      {/* Cards de Métricas e Estatísticas (Flexbox + Box Model) */}
      <section className="metricas-grid">
        <div className="card-metrica">
          <span className="card-metrica__numero">{estatisticas.totalMonitorias}</span>
          <span className="card-metrica__rotulo">Monitorias Oferecidas</span>
        </div>
        <div className="card-metrica">
          <span className="card-metrica__numero">{estatisticas.totalVagasDisponiveis}</span>
          <span className="card-metrica__rotulo">Vagas Abertas</span>
        </div>
        <div className="card-metrica">
          <span className="card-metrica__numero">{estatisticas.totalDisciplinasDistintas}</span>
          <span className="card-metrica__rotulo">Disciplinas Atendidas</span>
        </div>
        <div className="card-metrica card-metrica--destaque">
          <span className="card-metrica__numero">{inscricoesUsuario.length}</span>
          <span className="card-metrica__rotulo">Suas Inscrições Ativas</span>
        </div>
      </section>

      {/* Feedback flutuante de ação */}
      {notificacao && (
        <div className={`alerta alerta--${notificacao.tipo}`} role="alert">
          {notificacao.texto}
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
        <h2 className="secao-titulo">Sessões de Monitoria Disponíveis</h2>

        {monitoriasFiltradas.length === 0 ? (
          <div className="estado-vazio">
            <p>Nenhuma sessão encontrada para os filtros selecionados.</p>
            <button type="button" className="btn-limpar" onClick={handleLimparFiltros}>
              Restaurar Lista Completa
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
