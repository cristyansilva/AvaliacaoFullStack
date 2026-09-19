import Badge from '../Badge/Badge';
import Icon from '../Icon/Icon';
import { formatarDataSessao } from '../../utils/helpers';

/**
 * Componente Reutilizável de Card de Monitoria
 * @param {Object} monitoria - Dados da monitoria
 * @param {Function} onInscrever - Callback executado ao clicar no botão de inscrição
 * @param {boolean} isInscrito - Indica se o usuário atual já está inscrito nesta vaga
 */
export default function CardMonitoria({ monitoria, onInscrever, isInscrito = false }) {
  const {
    id,
    disciplina,
    monitor,
    emailMonitor,
    data,
    horario,
    tipo,
    local,
    topico,
    vagasDisponiveis,
    vagasTotais
  } = monitoria;

  const estaEsgotado = vagasDisponiveis <= 0;
  const dataSessao = formatarDataSessao(data);

  // Percentual de ocupação exibido na barra de capacidade
  const percentualOcupado = vagasTotais > 0
    ? Math.round(((vagasTotais - vagasDisponiveis) / vagasTotais) * 100)
    : 0;
  const poucasVagas = !estaEsgotado && vagasTotais > 2 && vagasDisponiveis / vagasTotais <= 0.25;

  // Determina a variante do Badge
  const getBadgeVariant = () => {
    if (isInscrito) return 'success';
    if (estaEsgotado) return 'danger';
    if (poucasVagas) return 'warning';
    return 'info';
  };

  const getStatusLabel = () => {
    if (isInscrito) return 'Inscrito';
    if (estaEsgotado) return 'Esgotado';
    if (poucasVagas) return 'Últimas vagas';
    return 'Disponível';
  };

  return (
    <article className={`card-monitoria ${isInscrito ? 'card-monitoria--inscrito' : ''}`}>
      <div className="card-monitoria__header">
        <div className="card-monitoria__data" aria-hidden="true">
          <span className="card-monitoria__data-dia">{dataSessao.dia}</span>
          <span className="card-monitoria__data-mes">{dataSessao.mes}</span>
        </div>

        <div className="card-monitoria__cabecalho-texto">
          <span className="card-monitoria__tipo">
            {tipo} · {dataSessao.semana}
          </span>
          <h3 className="card-monitoria__titulo">{disciplina}</h3>
        </div>

        <Badge variant={getBadgeVariant()}>{getStatusLabel()}</Badge>
      </div>

      <p className="card-monitoria__topico">{topico}</p>

      <ul className="card-monitoria__detalhes">
        <li>
          <Icon name="usuario" />
          <span className="sr-only">Monitor(a): </span>
          {monitor}
        </li>
        <li>
          <Icon name="relogio" />
          <span className="sr-only">Data e horário: </span>
          {dataSessao.completa} · {horario}
        </li>
        <li>
          <Icon name="local" />
          <span className="sr-only">Local: </span>
          {local}
        </li>
        <li>
          <Icon name="email" />
          <a href={`mailto:${emailMonitor}`}>{emailMonitor}</a>
        </li>
      </ul>

      <div className="card-monitoria__footer">
        <div className="card-monitoria__vagas">
          <span>Vagas: <strong>{vagasDisponiveis}</strong> de {vagasTotais}</span>
          <div
            className="card-monitoria__capacidade"
            role="progressbar"
            aria-label="Ocupação da sessão"
            aria-valuenow={percentualOcupado}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${percentualOcupado}%` }} />
          </div>
        </div>

        <button
          type="button"
          className={`btn-acao ${isInscrito ? 'btn-acao--cancelar' : 'btn-acao--primario'}`}
          onClick={() => onInscrever(id)}
          disabled={estaEsgotado && !isInscrito}
        >
          {isInscrito
            ? 'Cancelar inscrição'
            : estaEsgotado
            ? 'Esgotado'
            : 'Reservar minha vaga'}
        </button>
      </div>
    </article>
  );
}
