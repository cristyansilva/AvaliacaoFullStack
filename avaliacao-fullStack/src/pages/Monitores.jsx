import { useState } from 'react';
import { listaMonitoresMock, listaDisciplinasMock } from '../data/monitoriaData';
import Badge from '../components/Badge/Badge';
import Icon from '../components/Icon/Icon';
import { obterIniciais } from '../utils/helpers';

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
    setAvaliacaoFeedback(`Avaliação registrada para ${nomeMonitor}. Obrigado pelo retorno.`);
    setTimeout(() => setAvaliacaoFeedback(null), 4000);
  };

  return (
    <div className="pagina-monitores">
      <header className="cabecalho-pagina">
        <span className="cabecalho-pagina__tag">Equipe de monitoria</span>
        <h1>Monitores do semestre</h1>
        <p>
          Conheça os monitores aprovados no edital institucional da FMP para prestar
          auxílio pedagógico aos alunos durante este semestre letivo.
        </p>
      </header>

      {avaliacaoFeedback && (
        <div className="alerta alerta--sucesso" role="alert">
          <Icon name="confirmado" size={18} />
          <span>{avaliacaoFeedback}</span>
        </div>
      )}

      <div className="painel-filtro-monitores">
        <label htmlFor="filtro-disc-monitor">Disciplina</label>
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
          {monitoresFiltrados.length} {monitoresFiltrados.length === 1 ? 'monitor' : 'monitores'}
        </span>
      </div>

      <div className="grid-monitores">
        {monitoresFiltrados.map((m) => (
          <article key={m.id} className="card-monitor">
            <div className="card-monitor__topo">
              <div className="card-monitor__avatar">
                {obterIniciais(m.nome)}
              </div>
              <div className="card-monitor__info">
                <h3>{m.nome}</h3>
                <span className="card-monitor__sub">{m.curso} · {m.semestre}</span>
                <div className="card-monitor__rating">
                  <Icon name="estrela" size={14} />
                  <strong>{m.avaliacaoMedia.toFixed(1)}</strong>
                  <span>· {m.totalAtendimentos} atendimentos</span>
                </div>
              </div>
            </div>

            <p className="card-monitor__bio">{m.bio}</p>

            <div className="card-monitor__secao">
              <strong>Disciplinas</strong>
              <div className="card-monitor__tags">
                {m.disciplinas.map((disc) => (
                  <Badge key={disc} variant="info">
                    {disc}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="card-monitor__secao">
              <strong>Atendimento</strong>
              <p className="texto-horario">{m.diasAtendimento}</p>
              <p className="texto-modalidade">{m.modalidade}</p>
            </div>

            <div className="card-monitor__footer">
              <a href={`mailto:${m.email}`} className="btn-contato" title={m.email}>
                <Icon name="email" />
                Enviar e-mail
              </a>
              <button
                type="button"
                className="btn-avaliar"
                onClick={() => handleAvaliar(m.nome)}
              >
                Avaliar atendimento
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
