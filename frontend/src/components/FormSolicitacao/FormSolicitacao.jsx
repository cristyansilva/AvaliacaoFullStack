import { useState } from 'react';
import { listaDisciplinasMock } from '../../data/monitoriaData';
import { validarSolicitacao } from '../../utils/helpers';
import Icon from '../Icon/Icon';

/**
 * Componente Reutilizável de Formulário para Solicitação de Monitoria
 * Requisito Aula 04: Interação controlada com useState (inputs, validações, feedback)
 * Requisitos RF07 e RF08 do Monitoria Flow: Solicitação de monitorias individuais e coletivas
 * @param {Function} onSalvarSolicitacao - Callback chamado após envio do formulário válido
 */
export default function FormSolicitacao({ onSalvarSolicitacao }) {
  // Estado inicial dos campos do formulário
  const estadoInicial = {
    nome: '',
    matricula: '',
    email: '',
    disciplina: 'Algoritmos e Programação',
    tipo: 'Individual',
    periodoPreferencial: 'Noite (18:00 - 19:30)',
    topico: '',
    observacoes: ''
  };

  const [formData, setFormData] = useState(estadoInicial);
  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Manipulador genérico de alteração de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Remove erro do campo ao começar a digitar
    if (erros[name]) {
      setErros((prev) => {
        const novosErros = { ...prev };
        delete novosErros[name];
        return novosErros;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação usando função auxiliar com lógica JavaScript
    const validacao = validarSolicitacao(formData);

    if (!validacao.isValid) {
      setErros(validacao.erros);
      setMensagemSucesso('');
      return;
    }

    // Cria nova solicitação enriquecida
    const novaSolicitacao = {
      id: Date.now(),
      ...formData,
      status: 'Pendente de Atribuição',
      dataRegistro: new Date().toLocaleDateString('pt-BR')
    };

    onSalvarSolicitacao(novaSolicitacao);

    // Limpa formulário e exibe mensagem de sucesso
    setFormData(estadoInicial);
    setErros({});
    setMensagemSucesso('Solicitação registrada. O monitor da disciplina entrará em contato pelo e-mail informado.');

    setTimeout(() => {
      setMensagemSucesso('');
    }, 6000);
  };

  return (
    <form className="form-solicitacao" onSubmit={handleSubmit} noValidate>
      {mensagemSucesso && (
        <div className="alerta alerta--sucesso" role="alert">
          <Icon name="confirmado" size={18} />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      <div className="form-solicitacao__grid">
        <div className="form-campo">
          <label htmlFor="nome">Nome completo <span className="obrigatorio" aria-hidden="true">*</span></label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Marlon da Silva"
            className={erros.nome ? 'input-custom input-custom--erro' : 'input-custom'}
          />
          {erros.nome && <span className="msg-erro">{erros.nome}</span>}
        </div>

        <div className="form-campo">
          <label htmlFor="matricula">Matrícula <span className="obrigatorio" aria-hidden="true">*</span></label>
          <input
            id="matricula"
            name="matricula"
            type="text"
            value={formData.matricula}
            onChange={handleChange}
            placeholder="Ex: 202401928"
            className={erros.matricula ? 'input-custom input-custom--erro' : 'input-custom'}
          />
          {erros.matricula && <span className="msg-erro">{erros.matricula}</span>}
        </div>

        <div className="form-campo">
          <label htmlFor="email">E-mail institucional <span className="obrigatorio" aria-hidden="true">*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: aluno@aluno.fmp.edu.br"
            className={erros.email ? 'input-custom input-custom--erro' : 'input-custom'}
          />
          {erros.email && <span className="msg-erro">{erros.email}</span>}
        </div>

        <div className="form-campo">
          <label htmlFor="disciplina">Disciplina <span className="obrigatorio" aria-hidden="true">*</span></label>
          <select
            id="disciplina"
            name="disciplina"
            value={formData.disciplina}
            onChange={handleChange}
            className={erros.disciplina ? 'select-custom select-custom--erro' : 'select-custom'}
          >
            {listaDisciplinasMock
              .filter((d) => d !== 'Todas as Disciplinas')
              .map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>
          {erros.disciplina && <span className="msg-erro">{erros.disciplina}</span>}
        </div>

        <div className="form-campo">
          <label htmlFor="tipo">Formato</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="select-custom"
          >
            <option value="Individual">Individual — dúvidas pontuais, 1 a 1</option>
            <option value="Coletiva">Coletiva — grupo de estudo ou revisão</option>
          </select>
        </div>

        <div className="form-campo">
          <label htmlFor="periodoPreferencial">Horário preferencial</label>
          <select
            id="periodoPreferencial"
            name="periodoPreferencial"
            value={formData.periodoPreferencial}
            onChange={handleChange}
            className="select-custom"
          >
            <option value="Tarde (16:30 - 18:00)">Tarde (16:30 - 18:00)</option>
            <option value="Noite (18:00 - 19:30)">Noite (18:00 - 19:30)</option>
            <option value="Noite (19:30 - 21:00)">Noite (19:30 - 21:00)</option>
            <option value="Sábado Pela Manhã (09:00 - 11:00)">Sábado Pela Manhã (09:00 - 11:00)</option>
          </select>
        </div>
      </div>

      <div className="form-campo form-campo--full">
        <label htmlFor="topico">Conteúdo em que precisa de apoio <span className="obrigatorio" aria-hidden="true">*</span></label>
        <textarea
          id="topico"
          name="topico"
          rows={3}
          value={formData.topico}
          onChange={handleChange}
          placeholder="Ex: Dificuldade em entender recursão com árvore binária em C"
          className={erros.topico ? 'textarea-custom textarea-custom--erro' : 'textarea-custom'}
        />
        {erros.topico && <span className="msg-erro">{erros.topico}</span>}
      </div>

      <div className="form-campo form-campo--full">
        <label htmlFor="observacoes">Observações <span className="opcional">(opcional)</span></label>
        <input
          id="observacoes"
          name="observacoes"
          type="text"
          value={formData.observacoes}
          onChange={handleChange}
          placeholder="Ex: Prefiro atendimento via Google Meet"
          className="input-custom"
        />
      </div>

      <div className="form-solicitacao__acoes">
        <button type="submit" className="btn-enviar">
          Enviar solicitação
        </button>
      </div>
    </form>
  );
}
