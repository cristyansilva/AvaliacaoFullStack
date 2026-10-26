// REQUISITO AULA 03: Fundamentos de JavaScript
// Aplicação de: Variáveis (let/const), Tipos de dados, Arrays, Objetos, Funções, Loops e Condicionais.

// 1. VARIÁVEIS CONSTANTES (const) E TIPOS DE DADOS PRIMITIVOS
// Tipos: String (texto), Number (número), Boolean (verdadeiro/falso)
const TITULO_SISTEMA = "Filtro de Produtos"; // Tipo: String
const PRECO_MINIMO_PADRAO = 50;             // Tipo: Number
const SISTEMA_ATIVO = true;                  // Tipo: Boolean

// 2. ARRAY DE OBJETOS (Estrutura de dados complexa)
export const listaProdutosMock = [
  { id: 1, nome: "Teclado Mecânico", preco: 150.00, disponivel: true },
  { id: 2, nome: "Mouse Gamer", preco: 45.00, disponivel: true },
  { id: 3, nome: "Monitor 24 polegadas", preco: 850.00, disponivel: false },
  { id: 4, nome: "Headset USB", preco: 80.00, disponivel: true }
];

// 3. FUNÇÃO COM PARÂMETROS E RETORNO DE OBJETOS
export function processarProdutos(produtos, valorCorte = PRECO_MINIMO_PADRAO) {
  // VARIÁVEL MUTÁVEL (let)
  let quantidadeEncontrada = 0; // Tipo: Number
  const produtosFiltrados = [];  // Tipo: Array

  // CONDICIONAL (if): Verifica se o sistema está ativo antes de rodar o loop
  if (!SISTEMA_ATIVO) {
    console.warn("O sistema está temporariamente inativo.");
    return { total: 0, itens: [] };
  }

  // 4. LOOP (for): Percorre cada elemento da lista/array
  for (let i = 0; i < produtos.length; i++) {
    const produtoAtual = produtos[i]; // Acessa o objeto dentro do array

    // CONDICIONAL COM OPERADORES LÓGICOS (&& - E)
    // Filtra apenas produtos que estão disponíveis E possuem preço maior ou igual ao corte
    if (produtoAtual.disponivel === true && produtoAtual.preco >= valorCorte) {
      produtosFiltrados.push(produtoAtual); // Adiciona item ao novo array
      quantidadeEncontrada++;               // Incrementa a variável let (+1)
    }
  }

  // Retorna um Objeto contendo o total contado e o array filtrado
  return {
    titulo: TITULO_SISTEMA,
    total: quantidadeEncontrada,
    itens: produtosFiltrados
  };
}

// =========================================================================
// REQUISITOS MONITORIA FLOW (Projeto Integrador III - ADS FMP)
// Lógica de filtragem, cálculos e validações do sistema acadêmico
// =========================================================================

/**
 * Filtra lista de monitorias baseado em busca textual, disciplina e modalidade
 * @param {Array} monitorias - Lista de monitorias
 * @param {string} textoBusca - Termo digitado pelo usuário
 * @param {string} disciplina - Disciplina selecionada no dropdown
 * @param {string} tipo - 'Todos', 'Individual' ou 'Coletiva'
 * @returns {Array} Lista filtrada de monitorias
 */
export function filtrarMonitorias(monitorias, textoBusca = '', disciplina = 'Todas as Disciplinas', tipo = 'Todos') {
  if (!Array.isArray(monitorias)) return [];

  const termoLimpo = textoBusca.trim().toLowerCase();

  return monitorias.filter((item) => {
    // Validação por disciplina
    const bateDisciplina = disciplina === 'Todas as Disciplinas' || item.disciplina === disciplina;

    // Validação por tipo (Individual / Coletiva)
    const bateTipo = tipo === 'Todos' || item.tipo === tipo;

    // Validação textual (disciplina, monitor, tópico ou local)
    const bateTexto = termoLimpo === '' ||
      item.disciplina.toLowerCase().includes(termoLimpo) ||
      item.monitor.toLowerCase().includes(termoLimpo) ||
      item.topico.toLowerCase().includes(termoLimpo) ||
      item.local.toLowerCase().includes(termoLimpo);

    return bateDisciplina && bateTipo && bateTexto;
  });
}

/**
 * Calcula métricas gerais sobre as monitorias para exibição no dashboard
 * @param {Array} monitorias - Lista de monitorias
 * @returns {Object} Estatísticas consolidadas
 */
export function calcularEstatisticasMonitorias(monitorias = []) {
  let totalVagas = 0;
  let totalVagasDisponiveis = 0;
  let individuais = 0;
  let coletivas = 0;
  const disciplinasSet = new Set();

  for (let i = 0; i < monitorias.length; i++) {
    const m = monitorias[i];
    totalVagas += (m.vagasTotais || 0);
    totalVagasDisponiveis += (m.vagasDisponiveis || 0);

    if (m.tipo === 'Individual') {
      individuais++;
    } else {
      coletivas++;
    }

    if (m.disciplina) {
      disciplinasSet.add(m.disciplina);
    }
  }

  return {
    totalMonitorias: monitorias.length,
    totalVagas,
    totalVagasDisponiveis,
    totalIndividuais: individuais,
    totalColetivas: coletivas,
    totalDisciplinasDistintas: disciplinasSet.size
  };
}

/**
 * Validação de formulário de solicitação de monitoria
 * @param {Object} dados - Campos do formulário
 * @returns {Object} { isValid: boolean, erros: Object }
 */
export function validarSolicitacao(dados) {
  const erros = {};

  if (!dados.nome || dados.nome.trim().length < 3) {
    erros.nome = "O nome completo deve ter pelo menos 3 caracteres.";
  }

  if (!dados.matricula || dados.matricula.trim().length < 4) {
    erros.matricula = "Informe uma matrícula válida.";
  }

  if (!dados.email || !dados.email.includes("@")) {
    erros.email = "Informe um e-mail institucional válido (@aluno.fmp.edu.br).";
  }

  if (!dados.disciplina || dados.disciplina === "Todas as Disciplinas") {
    erros.disciplina = "Selecione a disciplina desejada.";
  }

  if (!dados.topico || dados.topico.trim().length < 5) {
    erros.topico = "Descreva a dúvida ou conteúdo desejado (mínimo 5 caracteres).";
  }

  return {
    isValid: Object.keys(erros).length === 0,
    erros
  };
}

const MESES_ABREVIADOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const DIAS_SEMANA_ABREVIADOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/**
 * Converte uma data ISO (AAAA-MM-DD) nas partes exibidas no card de sessão
 * Faz o parse manual para evitar deslocamento de fuso horário do construtor Date(string)
 * @param {string} dataIso - Data no formato '2026-09-22'
 * @returns {Object} { dia: '22', mes: 'set', semana: 'Ter', completa: '22/09/2026' }
 */
export function formatarDataSessao(dataIso = '') {
  const [ano, mes, dia] = dataIso.split('-').map(Number);

  if (!ano || !mes || !dia) {
    return { dia: '--', mes: '', semana: '', completa: dataIso };
  }

  const data = new Date(ano, mes - 1, dia);

  return {
    dia: String(dia).padStart(2, '0'),
    mes: MESES_ABREVIADOS[mes - 1],
    semana: DIAS_SEMANA_ABREVIADOS[data.getDay()],
    completa: `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`
  };
}

/**
 * Gera as iniciais exibidas no avatar a partir do primeiro e do último nome
 * Ignora preposições ('da', 'das', 'de') para evitar resultados como "Cd"
 * @param {string} nomeCompleto - Ex: 'Cristyan das Neves'
 * @returns {string} Ex: 'CN'
 */
export function obterIniciais(nomeCompleto = '') {
  const partes = nomeCompleto.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '';

  const primeira = partes[0];
  const ultima = partes.length > 1 ? partes[partes.length - 1] : '';
  return `${primeira[0]}${ultima ? ultima[0] : ''}`.toUpperCase();
}
