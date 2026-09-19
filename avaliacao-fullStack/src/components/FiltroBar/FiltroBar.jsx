import React from 'react';
import { listaDisciplinasMock } from '../../data/monitoriaData';

/**
 * Componente Reutilizável de Filtros e Busca
 * @param {string} busca - Termo de busca textual
 * @param {Function} onBuscaChange - Handler de alteração da busca
 * @param {string} disciplina - Disciplina selecionada
 * @param {Function} onDisciplinaChange - Handler de seleção de disciplina
 * @param {string} tipo - Tipo selecionado ('Todos', 'Individual', 'Coletiva')
 * @param {Function} onTipoChange - Handler de seleção de tipo
 * @param {Function} onLimparFiltros - Handler para redefinir filtros
 * @param {number} totalEncontrados - Quantidade de itens filtrados
 */
export default function FiltroBar({
  busca,
  onBuscaChange,
  disciplina,
  onDisciplinaChange,
  tipo,
  onTipoChange,
  onLimparFiltros,
  totalEncontrados
}) {
  return (
    <section className="filtro-bar" aria-label="Filtros de Monitoria">
      <div className="filtro-bar__linha-principal">
        <div className="filtro-bar__campo filtro-bar__campo--busca">
          <label htmlFor="input-busca">Buscar por disciplina, monitor ou tópico:</label>
          <input
            id="input-busca"
            type="text"
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            placeholder="Ex: Algoritmos, Cristyan, Recursão..."
            className="input-custom"
          />
        </div>

        <div className="filtro-bar__campo">
          <label htmlFor="select-disciplina">Filtrar por Disciplina:</label>
          <select
            id="select-disciplina"
            value={disciplina}
            onChange={(e) => onDisciplinaChange(e.target.value)}
            className="select-custom"
          >
            {listaDisciplinasMock.map((disc) => (
              <option key={disc} value={disc}>
                {disc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filtro-bar__linha-secundaria">
        <div className="filtro-bar__tipos">
          <span className="filtro-bar__tipos-label">Modalidade:</span>
          {['Todos', 'Individual', 'Coletiva'].map((t) => (
            <button
              key={t}
              type="button"
              className={`btn-tag ${tipo === t ? 'btn-tag--ativo' : ''}`}
              onClick={() => onTipoChange(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filtro-bar__acoes">
          <span className="filtro-bar__contador">
            Exibindo <strong>{totalEncontrados}</strong> {totalEncontrados === 1 ? 'monitoria' : 'monitorias'}
          </span>
          <button
            type="button"
            className="btn-limpar"
            onClick={onLimparFiltros}
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </section>
  );
}
