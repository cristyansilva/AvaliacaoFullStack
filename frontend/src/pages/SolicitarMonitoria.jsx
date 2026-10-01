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
        <span className="cabecalho-pagina__tag">Atendimento sob demanda</span>
        <h1>Solicitar atendimento</h1>
        <p>
          Descreva a disciplina e o conteúdo em que precisa de apoio. O monitor responsável
          organiza um horário compatível com a sua rotina.
        </p>
      </header>

      <div className="layout-solicitacao">
        <div className="layout-solicitacao__form">
          <div className="card-painel">
            <h2 className="card-painel__titulo">Nova solicitação</h2>
            <FormSolicitacao onSalvarSolicitacao={onAdicionarSolicitacao} />
          </div>
        </div>

        <aside className="layout-solicitacao__info">
          <div className="card-painel card-painel--dicas">
            <h3 className="card-painel__titulo">Como funciona</h3>
            <ol className="lista-passos">
              <li>
                <strong>Envio do pedido</strong>Você especifica a disciplina e as dificuldades encontradas.
              </li>
              <li>
                <strong>Triagem</strong>O monitor da disciplina recebe a notificação e verifica a disponibilidade.
              </li>
              <li>
                <strong>Confirmação</strong>Data e sala (ou link do Meet) são confirmados via e-mail acadêmico.
              </li>
              <li>
                <strong>Frequência</strong>A participação gera validação de frequência e registro para ambas as partes.
              </li>
            </ol>
          </div>

          <div className="card-painel">
            <h3 className="card-painel__titulo">Minhas solicitações <span className="contador">{solicitacoes.length}</span></h3>
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
                        {item.topico}
                      </p>
                      <div className="item-solicitacao__meta">
                        <span>{item.nome} · {item.matricula}</span>
                        <span>{item.periodoPreferencial}</span>
                        <span>Registrada em {item.dataRegistro}</span>
                      </div>
                      {!foiCancelada && (
                        <button
                          type="button"
                          className="btn-cancelar-solicitacao"
                          onClick={() => handleCancelarSolicitacao(item.id)}
                        >
                          Cancelar pedido
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
