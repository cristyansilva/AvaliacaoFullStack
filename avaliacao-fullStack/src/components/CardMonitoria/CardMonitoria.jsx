import React from 'react';
import Badge from '../Badge/Badge';

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
    vagasTotais,
    status
  } = monitoria;

  const estaEsgotado = vagasDisponiveis <= 0;

  // Determina a variante do Badge
  const getBadgeVariant = () => {
    if (isInscrito) return 'success';
    if (estaEsgotado) return 'danger';
    if (tipo === 'Individual') return 'warning';
    return 'info';
  };

  const getStatusLabel = () => {
    if (isInscrito) return 'Inscrição Confirmada';
    if (estaEsgotado) return 'Vagas Esgotadas';
    return `${status} (${vagasDisponiveis}/${vagasTotais} vagas)`;
  };

  return (
    <article className={`card-monitoria ${isInscrito ? 'card-monitoria--inscrito' : ''}`}>
      <div className="card-monitoria__header">
        <span className="card-monitoria__tipo">{tipo}</span>
        <Badge variant={getBadgeVariant()}>{getStatusLabel()}</Badge>
      </div>

      <h3 className="card-monitoria__titulo">{disciplina}</h3>
      <p className="card-monitoria__topico">{topico}</p>

      <div className="card-monitoria__detalhes">
        <p>
          <strong>Monitor(a):</strong> {monitor}
        </p>
        <p>
          <strong>Contato:</strong> <a href={`mailto:${emailMonitor}`}>{emailMonitor}</a>
        </p>
        <p>
          <strong>Data e Horário:</strong> {data} às {horario}
        </p>
        <p>
          <strong>Local / Formato:</strong> {local}
        </p>
      </div>

      <div className="card-monitoria__footer">
        <div className="card-monitoria__vagas">
          <span>Vagas: <strong>{vagasDisponiveis}</strong> de {vagasTotais}</span>
        </div>

        <button
          type="button"
          className={`btn-acao ${isInscrito ? 'btn-acao--cancelar' : 'btn-acao--primario'}`}
          onClick={() => onInscrever(id)}
          disabled={estaEsgotado && !isInscrito}
        >
          {isInscrito
            ? 'Cancelar Inscrição'
            : estaEsgotado
            ? 'Esgotado'
            : 'Reservar Minha Vaga'}
        </button>
      </div>
    </article>
  );
}
