import { useState } from 'react';
import FormSolicitacao from '../components/FormSolicitacao/FormSolicitacao';
import Badge from '../components/Badge/Badge';

/**
 * Página de Solicitação de Monitoria (RF07 e RF08)
 * Permite ao estudante requisitar atendimento individual ou coletivo
 */
export default function SolicitarMonitoria({ solicitacoes, onAdicionarSolicitacao }) {
  const [solicitacaoCanceladaId, setSolicitacaoCanceladaId] = useState(null);

  const handleCancelarSolicitacao = (id) => {
    setSolicitacaoCanceladaId(id);
    setTimeout(() => setSolicitacaoCanceladaId(null), 3000);
  };

  return (
    <div className="pagina-solicitar">
      <header className="cabecalho-pagina">
        <span className="cabecalho-pagina__tag">Requisitos RF07 e RF08</span>
        <h1>Solicitar Atendimento de Monitoria</h1>
        <p>
          Precisa de suporte em uma disciplina ou tópico específico? Preencha o formulário
          abaixo para que um monitor designado organize um horário de atendimento adequado à sua rotina.
        </p>
      </header>

      <div className="layout-solicitacao">
        <div className="layout-solicitacao__form">
          <div className="card-painel">
            <h2 className="card-painel__titulo">Formulário de Solicitação</h2>
            <FormSolicitacao onSalvarSolicitacao={onAdicionarSolicitacao} />
          </div>
        </div>

        <aside className="layout-solicitacao__info">
          <div className="card-painel card-painel--dicas">
            <h3 className="card-painel__titulo">Como funciona?</h3>
            <ul className="lista-passos">
              <li>
                <strong>1. Envio do Pedido:</strong> Você especifica a disciplina e as dificuldades encontradas.
              </li>
              <li>
                <strong>2. Triagem do Monitor:</strong> O monitor da disciplina recebe a notificação e verifica a disponibilidade.
              </li>
              <li>
                <strong>3. Confirmação mútua:</strong> Data e sala (ou link do Meet) são confirmados via e-mail acadêmico.
              </li>
              <li>
                <strong>4. Horas e Frequência:</strong> A participação gera validação de frequência e registro para ambas as partes.
              </li>
            </ul>
          </div>

          <div className="card-painel">
            <h3 className="card-painel__titulo">Minhas Solicitações Recentes ({solicitacoes.length})</h3>
            {solicitacoes.length === 0 ? (
              <p className="texto-secundario">Nenhuma solicitação registrada nesta sessão.</p>
            ) : (
              <div className="lista-solicitacoes">
                {solicitacoes.map((item) => {
                  const foiCancelada = solicitacaoCanceladaId === item.id;
                  return (
                    <div key={item.id} className="item-solicitacao">
                      <div className="item-solicitacao__header">
                        <strong>{item.disciplina}</strong>
                        <Badge variant={foiCancelada ? 'danger' : 'info'}>
                          {foiCancelada ? 'Cancelada' : item.tipo}
                        </Badge>
                      </div>
                      <p className="item-solicitacao__topico">
                        <em>"{item.topico}"</em>
                      </p>
                      <div className="item-solicitacao__meta">
                        <span>Aluno: {item.nome} ({item.matricula})</span>
                        <span>Preferência: {item.periodoPreferencial}</span>
                        <span>Registrado em: {item.dataRegistro}</span>
                      </div>
                      {!foiCancelada && (
                        <button
                          type="button"
                          className="btn-cancelar-solicitacao"
                          onClick={() => handleCancelarSolicitacao(item.id)}
                        >
                          Cancelar Pedido
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
