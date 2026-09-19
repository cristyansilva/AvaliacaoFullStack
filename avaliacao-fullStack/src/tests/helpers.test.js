import { describe, it, expect } from 'vitest';
import {
  filtrarMonitorias,
  calcularEstatisticasMonitorias,
  validarSolicitacao,
  processarProdutos,
  listaProdutosMock
} from '../utils/helpers';

/**
 * REQUISITO AULA 05: Testes Unitários de Funções (Jest / Vitest)
 */
describe('Funções Auxiliares e Lógica de Negócio (Monitoria Flow)', () => {
  const monitoriasMock = [
    {
      id: 1,
      disciplina: 'Algoritmos e Programação',
      monitor: 'Cristyan das Neves',
      topico: 'Estruturas Condicionais',
      tipo: 'Coletiva',
      local: 'Lab 03',
      vagasDisponiveis: 5,
      vagasTotais: 10
    },
    {
      id: 2,
      disciplina: 'Estruturas de Dados',
      monitor: 'Lauren Oliveira',
      topico: 'Árvores Binárias',
      tipo: 'Individual',
      local: 'Meet',
      vagasDisponiveis: 1,
      vagasTotais: 1
    },
    {
      id: 3,
      disciplina: 'Banco de Dados I',
      monitor: 'Marlon da Silva',
      topico: 'Normalização SQL',
      tipo: 'Coletiva',
      local: 'Lab 04',
      vagasDisponiveis: 0,
      vagasTotais: 12
    }
  ];

  it('deve filtrar monitorias por texto de busca', () => {
    const resultado = filtrarMonitorias(monitoriasMock, 'árvores', 'Todas as Disciplinas', 'Todos');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].disciplina).toBe('Estruturas de Dados');
  });

  it('deve filtrar monitorias por disciplina específica', () => {
    const resultado = filtrarMonitorias(monitoriasMock, '', 'Banco de Dados I', 'Todos');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].monitor).toBe('Marlon da Silva');
  });

  it('deve filtrar monitorias por tipo (Individual vs Coletiva)', () => {
    const individuais = filtrarMonitorias(monitoriasMock, '', 'Todas as Disciplinas', 'Individual');
    const coletivas = filtrarMonitorias(monitoriasMock, '', 'Todas as Disciplinas', 'Coletiva');

    expect(individuais).toHaveLength(1);
    expect(coletivas).toHaveLength(2);
  });

  it('deve calcular estatísticas consolidadas corretamente', () => {
    const stats = calcularEstatisticasMonitorias(monitoriasMock);

    expect(stats.totalMonitorias).toBe(3);
    expect(stats.totalVagas).toBe(23); // 10 + 1 + 12
    expect(stats.totalVagasDisponiveis).toBe(6); // 5 + 1 + 0
    expect(stats.totalIndividuais).toBe(1);
    expect(stats.totalColetivas).toBe(2);
    expect(stats.totalDisciplinasDistintas).toBe(3);
  });

  it('deve validar formulário de solicitação com dados válidos', () => {
    const dadosValidos = {
      nome: 'Marlon da Silva',
      matricula: '202401889',
      email: 'marlon@aluno.fmp.edu.br',
      disciplina: 'Estruturas de Dados',
      topico: 'Dúvidas em listas encadeadas e ponteiros'
    };

    const validacao = validarSolicitacao(dadosValidos);
    expect(validacao.isValid).toBe(true);
    expect(Object.keys(validacao.erros)).toHaveLength(0);
  });

  it('deve acusar erro ao validar solicitação com campos vazios', () => {
    const dadosInvalidos = {
      nome: '',
      matricula: '',
      email: 'emailinvalido',
      disciplina: 'Todas as Disciplinas',
      topico: 'Oi'
    };

    const validacao = validarSolicitacao(dadosInvalidos);
    expect(validacao.isValid).toBe(false);
    expect(validacao.erros.nome).toBeDefined();
    expect(validacao.erros.matricula).toBeDefined();
    expect(validacao.erros.email).toBeDefined();
    expect(validacao.erros.disciplina).toBeDefined();
    expect(validacao.erros.topico).toBeDefined();
  });

  it('deve manter funcionamento da função de produtos da Aula 03', () => {
    const resultado = processarProdutos(listaProdutosMock, 50);
    expect(resultado.total).toBeGreaterThan(0);
    expect(resultado.itens.every((item) => item.preco >= 50 && item.disponivel)).toBe(true);
  });
});
