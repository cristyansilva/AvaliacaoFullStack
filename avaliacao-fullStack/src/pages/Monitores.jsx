import { useState } from 'react';
import { listaMonitoresMock, listaDisciplinasMock } from '../data/monitoriaData';
import Badge from '../components/Badge/Badge';

/**
 * Página do Corpo de Monitores (RF06, RF13, RF23)
 * Apresenta o time de monitores atuantes, disciplinas e agendas disponíveis
 */
export default function Monitores() {
  const [filtroDisciplina, setFiltroDisciplina] = useState('Todas as Disciplinas');
  const [avaliacaoFeedback, setAvaliacaoFeedback] = useState(null);

  const monitoresFiltrados = listaMonitoresMock.filter((monitor) => {
    if (filtroDisciplina === 'Todas as Disciplinas') return true;
    return monitor.disciplinas.includes(filtroDisciplina);
  });

  const handleAvaliar = (nomeMonitor) => {
    setAvaliacaoFeedback(`Obrigado por registrar seu elogio ao monitor ${nomeMonitor}!`);
    setTimeout(() => setAvaliacaoFeedback(null), 4000);
  };

  return (
    <div className="pagina-monitores">
      <header className="cabecalho-pagina">
        <span className="cabecalho-pagina__tag">Equipe Docente Discente</span>
        <h1>Corpo de Monitores de ADS</h1>
        <p>
          Conheça os monitores aprovados no edital institucional da FMP para prestar
          auxílio pedagógico aos alunos durante este semestre letivo.
        </p>
      </header>

      {avaliacaoFeedback && (
        <div className="alerta alerta--sucesso" role="alert">
          {avaliacaoFeedback}
        </div>
      )}

      <div className="painel-filtro-monitores">
        <label htmlFor="filtro-disc-monitor">Filtrar monitores por disciplina:</label>
        <select
          id="filtro-disc-monitor"
          value={filtroDisciplina}
          onChange={(e) => setFiltroDisciplina(e.target.value)}
          className="select-custom"
        >
          {listaDisciplinasMock.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <span className="texto-contagem">
          {monitoresFiltrados.length} monitor(es) atendendo a este critério
        </span>
      </div>

      <div className="grid-monitores">
        {monitoresFiltrados.map((m) => (
          <article key={m.id} className="card-monitor">
            <div className="card-monitor__topo">
              <div className="card-monitor__avatar">
                {m.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="card-monitor__info">
                <h3>{m.nome}</h3>
                <span className="card-monitor__sub">{m.curso} • {m.semestre}</span>
                <div className="card-monitor__rating">
                  ⭐ <strong>{m.avaliacaoMedia.toFixed(1)}</strong> ({m.totalAtendimentos} atendimentos)
                </div>
              </div>
            </div>

            <p className="card-monitor__bio">{m.bio}</p>

            <div className="card-monitor__secao">
              <strong>Disciplinas Atendidas:</strong>
              <div className="card-monitor__tags">
                {m.disciplinas.map((disc) => (
                  <Badge key={disc} variant="info">
                    {disc}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="card-monitor__secao">
              <strong>Horários de Atendimento:</strong>
              <p className="texto-horario">{m.diasAtendimento}</p>
              <p className="texto-modalidade">{m.modalidade}</p>
            </div>

            <div className="card-monitor__footer">
              <a href={`mailto:${m.email}`} className="btn-contato">
                Enviar E-mail ({m.email})
              </a>
              <button
                type="button"
                className="btn-avaliar"
                onClick={() => handleAvaliar(m.nome)}
              >
                Avaliar Atendimento
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
