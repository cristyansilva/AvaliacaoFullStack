import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import SolicitarMonitoria from './pages/SolicitarMonitoria';
import Monitores from './pages/Monitores';
import Sobre from './pages/Sobre';
import ComunidadeApi from './pages/ComunidadeApi';
import { listaMonitoriasIniciaisMock } from './data/monitoriaData';

/**
 * REQUISITOS AULA 04 - REACT: COMPONENTES, HOOKS E ROTAS
 * - Projeto React com Vite
 * - Componentes reutilizáveis em components/ (Navbar, CardMonitoria, Badge, FormSolicitacao, FiltroBar)
 * - useState em formulários, filtros, listas e inscrições
 * - Renderização de listas com map() e key
 * - Rotas com React Router (4 rotas ativas) e navegação com Link
 */
export default function App() {
  // Estado centralizado de monitorias disponíveis
  const [monitorias, setMonitorias] = useState(listaMonitoriasIniciaisMock);

  // Estado de solicitações cadastradas pelos acadêmicos (RF07 / RF08)
  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: 1,
      nome: 'Marlon da Silva',
      matricula: '202401889',
      email: 'marlon.silva@aluno.fmp.edu.br',
      disciplina: 'Estruturas de Dados',
      tipo: 'Individual',
      periodoPreferencial: 'Noite (18:00 - 19:30)',
      topico: 'Dúvidas sobre balanceamento de Árvores AVL e rotações',
      observacoes: 'Disponível às quartas-feiras',
      status: 'Pendente de Atribuição',
      dataRegistro: '18/09/2026'
    }
  ]);

  const handleAdicionarSolicitacao = (novaSolicitacao) => {
    setSolicitacoes((prev) => [novaSolicitacao, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Menu de navegação global com links do React Router */}
        <Navbar />

        {/* Área principal com roteamento dinâmico */}
        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  monitorias={monitorias}
                  onAtualizarMonitorias={setMonitorias}
                />
              }
            />
            <Route
              path="/solicitar"
              element={
                <SolicitarMonitoria
                  solicitacoes={solicitacoes}
                  onAdicionarSolicitacao={handleAdicionarSolicitacao}
                />
              }
            />
            <Route path="/monitores" element={<Monitores />} />
            <Route path="/comunidade" element={<ComunidadeApi />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Rodapé institucional */}
        <footer className="app-footer">
          <div className="app-footer__conteudo">
            <p>
              <strong>Monitoria Flow</strong> — Plataforma Acadêmica de Monitorias
            </p>
            <p>
              Faculdade Municipal de Palhoça (FMP) • Análise e Desenvolvimento de Sistemas
            </p>
            <p className="app-footer__creditos">
              Projeto Integrador III • Alinhado à ODS 4 da ONU (Educação de Qualidade)
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}