import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente Reutilizável de Navegação Superior (Navbar)
 * Requisito Aula 04: Menu de navegação com componentes Link do React Router
 * Requisito Aula 02: Layout com Flexbox e Box Model
 */
export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  const rotas = [
    { caminho: '/', rotulo: 'Painel de Monitorias' },
    { caminho: '/solicitar', rotulo: 'Solicitar Atendimento' },
    { caminho: '/monitores', rotulo: 'Corpo de Monitores' },
    { caminho: '/comunidade', rotulo: 'Fórum (API)' },
    { caminho: '/sobre', rotulo: 'Sobre o Projeto (ODS 4)' }
  ];

  const alternarMenu = () => setMenuAberto((anterior) => !anterior);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav className="navbar-custom">
      <div className="navbar-custom__brand">
        <Link to="/" onClick={fecharMenu} className="navbar-custom__logo-link">
          <span className="navbar-custom__logo-icon">⚡</span>
          <div className="navbar-custom__logo-text">
            <strong>Monitoria Flow</strong>
            <span className="navbar-custom__sub">ADS • FMP</span>
          </div>
        </Link>
      </div>

      <button
        type="button"
        className="navbar-custom__toggle"
        onClick={alternarMenu}
        aria-label="Alternar navegação"
      >
        ☰
      </button>

      <ul className={`navbar-custom__links ${menuAberto ? 'navbar-custom__links--aberto' : ''}`}>
        {rotas.map((rota) => {
          const estaAtivo = location.pathname === rota.caminho;
          return (
            <li key={rota.caminho} className="navbar-custom__item">
              <Link
                to={rota.caminho}
                onClick={fecharMenu}
                className={`navbar-custom__link ${estaAtivo ? 'navbar-custom__link--ativo' : ''}`}
              >
                {rota.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
