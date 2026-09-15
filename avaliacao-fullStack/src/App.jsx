import React, { useState } from 'react';
// Importação da lista e da função auxiliar em JS da Aula 03
import { listaProdutosMock, processarProdutos } from './utils/helpers';

export default function App() {
  // Estado para armazenar os produtos exibidos em tela
  const [produtosExibidos, setProdutosExibidos] = useState(listaProdutosMock);
  const [totalItens, setTotalItens] = useState(listaProdutosMock.length);

  // REQUISITO AULA 03: Manipulação de Eventos em JavaScript
  const handleFiltrar = () => {
    // Executa a função JS criada em helpers.js passando R$ 50 como filtro
    const resultado = processarProdutos(listaProdutosMock, 50);
    
    // Atualiza os estados React com o resultado do filtro JS
    setProdutosExibidos(resultado.itens);
    setTotalItens(resultado.total);
  };

  const handleResetar = () => {
    setProdutosExibidos(listaProdutosMock);
    setTotalItens(listaProdutosMock.length);
  };

  return (
    <main>
<header className="header-container">
  <h1>Avaliação Full Stack - Módulo 1</h1>
  <p>Total de itens exibidos: <strong>{totalItens}</strong></p>
  
  <div className="button-group">
    <button onClick={handleFiltrar}>Filtrar Disponíveis ≥ R$50</button>
    <button onClick={handleResetar}>Mostrar Todos</button>
  </div>
</header>

      {/* Grid responsivo controlado pelas Media Queries em SCSS */}
      <section className="container-produtos">
        {produtosExibidos.map((item) => (
          <div key={item.id} className="card-item">
            <h3>{item.nome}</h3>
            <p><strong>Preço:</strong> R$ {item.preco.toFixed(2)}</p>
            <p><strong>Status:</strong> {item.disponivel ? "Disponível" : "Indisponível"}</p>
          </div>
        ))}
      </section>
    </main>
  );
}