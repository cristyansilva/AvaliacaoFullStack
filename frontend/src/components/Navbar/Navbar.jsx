import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useAuth } from '../../auth/AuthContext';

/**
 * Componente Reutilizável de Navegação Superior (Navbar)
 * Requisito Aula 04: Menu de navegação com componentes Link do React Router
 * Requisito Aula 02: Layout com Flexbox e Box Model
 */
export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const rotas = [
    { caminho: '/', rotulo: 'Monitorias' },
    { caminho: '/solicitar', rotulo: 'Solicitar atendimento' },
    { caminho: '/monitores', rotulo: 'Monitores' },
    { caminho: '/comunidade', rotulo: 'Comunidade' },
    { caminho: '/monitorias-api', rotulo: 'API' },
    { caminho: '/demonstracao', rotulo: 'Demonstração' },
    { caminho: '/sobre', rotulo: 'Sobre' }
  ];

  const alternarMenu = () => setMenuAberto((anterior) => !anterior);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="navbar-custom">
      <nav className="navbar-custom__inner" aria-label="Navegação principal">
        <div className="navbar-custom__brand">
          <Link to="/" onClick={fecharMenu} className="navbar-custom__logo-link">
            <span className="navbar-custom__logo-icon" aria-hidden="true">MF</span>
            <span className="navbar-custom__logo-text">
              <strong>Monitoria Flow</strong>
              <span className="navbar-custom__sub">ADS · FMP</span>
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="navbar-custom__toggle"
          onClick={alternarMenu}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
        >
          <Icon name={menuAberto ? 'fechar' : 'menu'} size={20} />
        </button>

        <ul
          id="menu-principal"
          className={`navbar-custom__links ${menuAberto ? 'navbar-custom__links--aberto' : ''}`}
        >
          {rotas.map((rota) => {
            const estaAtivo = location.pathname === rota.caminho;
            return (
              <li key={rota.caminho} className="navbar-custom__item">
                <Link
                  to={rota.caminho}
                  onClick={fecharMenu}
                  aria-current={estaAtivo ? 'page' : undefined}
                  className={`navbar-custom__link ${estaAtivo ? 'navbar-custom__link--ativo' : ''}`}
                >
                  {rota.rotulo}
                </Link>
              </li>
            );
          })}
        </ul>
        {usuario && <div className="navbar-custom__links"><span>Olá, {usuario.nome}</span><button type="button" className="btn-limpar" onClick={() => { logout(); navigate('/login', { replace: true }); }}>Sair</button></div>}
      </nav>
    </header>
  );
}
