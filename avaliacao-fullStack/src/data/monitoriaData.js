// Dados mockados e modelos para a plataforma Monitoria Flow (Projeto Integrador III - ADS FMP)

export const listaDisciplinasMock = [
  "Todas as Disciplinas",
  "Algoritmos e Programação",
  "Estruturas de Dados",
  "Banco de Dados I",
  "Programação Web I",
  "Engenharia de Software",
  "Redes de Computadores"
];

export const listaMonitoresMock = [
  {
    id: 1,
    nome: "Cristyan das Neves",
    email: "cristyan.silva@aluno.fmp.edu.br",
    curso: "Análise e Desenvolvimento de Sistemas",
    semestre: "4º Semestre",
    disciplinas: ["Algoritmos e Programação", "Programação Web I"],
    diasAtendimento: "Terças e Quintas: 18h às 19h30",
    modalidade: "Híbrido (Lab 02 / Meet)",
    bio: "Focado em desenvolvimento web moderno, front-end e lógica de programação. Ajudo com dúvidas práticas e exercícios.",
    totalAtendimentos: 24,
    avaliacaoMedia: 4.9
  },
  {
    id: 2,
    nome: "Marlon da Silva",
    email: "marlon.silva@aluno.fmp.edu.br",
    curso: "Análise e Desenvolvimento de Sistemas",
    semestre: "5º Semestre",
    disciplinas: ["Banco de Dados I", "Engenharia de Software"],
    diasAtendimento: "Segundas e Quartas: 17h30 às 19h",
    modalidade: "Presencial (Lab 04)",
    bio: "Interessado em modelagem relacional, SQL avançado, arquitetura de software e boas práticas de engenharia.",
    totalAtendimentos: 31,
    avaliacaoMedia: 5.0
  },
  {
    id: 3,
    nome: "Lauren Oliveira",
    email: "lauren.oliveira@aluno.fmp.edu.br",
    curso: "Análise e Desenvolvimento de Sistemas",
    semestre: "4º Semestre",
    disciplinas: ["Estruturas de Dados", "Algoritmos e Programação"],
    diasAtendimento: "Quartas e Sextas: 18h às 19h30",
    modalidade: "Online (Google Meet)",
    bio: "Apaixonada por resolução de problemas, análise de complexidade, recursão, listas e árvores.",
    totalAtendimentos: 19,
    avaliacaoMedia: 4.8
  },
  {
    id: 4,
    nome: "Taíse da Rosa",
    email: "taise.rosa@aluno.fmp.edu.br",
    curso: "Análise e Desenvolvimento de Sistemas",
    semestre: "5º Semestre",
    disciplinas: ["Programação Web I", "Redes de Computadores"],
    diasAtendimento: "Segundas e Terças: 19h às 20h30",
    modalidade: "Híbrido (Lab 03 / Discord)",
    bio: "Foco em arquitetura web, protocolos de rede, HTML/CSS/JS e desenvolvimento com React.",
    totalAtendimentos: 27,
    avaliacaoMedia: 4.9
  }
];

export const listaMonitoriasIniciaisMock = [
  {
    id: 101,
    disciplina: "Algoritmos e Programação",
    monitor: "Cristyan das Neves",
    emailMonitor: "cristyan.silva@aluno.fmp.edu.br",
    data: "2026-09-22",
    horario: "18:00 - 19:30",
    tipo: "Coletiva",
    local: "Laboratório 03 (Presencial)",
    topico: "Revisão de Estruturas Condicionais, Loops e Funções",
    vagasDisponiveis: 6,
    vagasTotais: 15,
    status: "Disponível",
    descricao: "Sessão focada na preparação para a primeira avaliação da disciplina de Algoritmos."
  },
  {
    id: 102,
    disciplina: "Estruturas de Dados",
    monitor: "Lauren Oliveira",
    emailMonitor: "lauren.oliveira@aluno.fmp.edu.br",
    data: "2026-09-23",
    horario: "18:30 - 20:00",
    tipo: "Individual",
    local: "Google Meet (Remoto)",
    topico: "Ponteiros, Listas Encadeadas e Alocação Dinâmica",
    vagasDisponiveis: 1,
    vagasTotais: 1,
    status: "Disponível",
    descricao: "Atendimento 1 a 1 para tirar dúvidas de implementação em C/C++."
  },
  {
    id: 103,
    disciplina: "Banco de Dados I",
    monitor: "Marlon da Silva",
    emailMonitor: "marlon.silva@aluno.fmp.edu.br",
    data: "2026-09-24",
    horario: "17:30 - 19:00",
    tipo: "Coletiva",
    local: "Laboratório 04 (Presencial)",
    topico: "Normalização de Dados (1FN, 2FN e 3FN) e Modelagem Conceitual",
    vagasDisponiveis: 8,
    vagasTotais: 12,
    status: "Disponível",
    descricao: "Prática com diagramas DER e aplicação prática de regras de integridade relacional."
  },
  {
    id: 104,
    disciplina: "Programação Web I",
    monitor: "Taíse da Rosa",
    emailMonitor: "taise.rosa@aluno.fmp.edu.br",
    data: "2026-09-25",
    horario: "19:00 - 20:30",
    tipo: "Coletiva",
    local: "Google Meet (Remoto)",
    topico: "Fundamentos de React: Componentes, JSX e Estado com useState",
    vagasDisponiveis: 0,
    vagasTotais: 10,
    status: "Esgotado",
    descricao: "Workshop mão na massa desenvolvendo pequenas aplicações interativas em React."
  },
  {
    id: 105,
    disciplina: "Engenharia de Software",
    monitor: "Marlon da Silva",
    emailMonitor: "marlon.silva@aluno.fmp.edu.br",
    data: "2026-09-28",
    horario: "18:00 - 19:30",
    tipo: "Individual",
    local: "Laboratório 02 (Presencial)",
    topico: "Levantamento de Requisitos Funcionais e Não-Funcionais",
    vagasDisponiveis: 1,
    vagasTotais: 1,
    status: "Disponível",
    descricao: "Orientação para elaboração de documentos de requisitos do Projeto Integrador."
  },
  {
    id: 106,
    disciplina: "Redes de Computadores",
    monitor: "Taíse da Rosa",
    emailMonitor: "taise.rosa@aluno.fmp.edu.br",
    data: "2026-09-29",
    horario: "18:30 - 20:00",
    tipo: "Coletiva",
    local: "Laboratório 03 (Presencial)",
    topico: "Endereçamento IPv4, Máscaras de Sub-rede e Roteamento Básico",
    vagasDisponiveis: 4,
    vagasTotais: 12,
    status: "Disponível",
    descricao: "Exercícios de cálculo de sub-rede e introdução a comandos de diagnóstico de rede."
  }
];
