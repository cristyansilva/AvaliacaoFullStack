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