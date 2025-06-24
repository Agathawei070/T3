import { Component } from 'react';
import { Link} from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <aside className="sidebar bg-dark text-light vh-100 d-flex flex-column shadow-lg">
        <div className="sidebar-header d-flex align-items-center justify-content-center py-4 border-bottom border-secondary">
          <Link className="navbar-brand fw-bold fs-3 text-info d-flex align-items-center" to="/">
            <i className="bi bi-paw-fill me-2"></i>C4P
          </Link>
        </div>
        <nav className="flex-grow-1">
          <ul className="nav flex-column gap-2 mt-4">
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/">
                <i className="bi bi-house me-2"></i>Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/clientes">
                <i className="bi bi-people me-2"></i>Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/pets">
                <i className="bi bi-heart-pulse me-2"></i>Pets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/produtos">
                <i className="bi bi-box-seam me-2"></i>Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/servicos">
                <i className="bi bi-gear me-2"></i>Serviços
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/consumo">
                <i className="bi bi-cart me-2"></i>Consumo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded-pill hover-nav text-light" to="/estatisticas">
                <i className="bi bi-bar-chart-line me-2"></i>Estatísticas
              </Link>
            </li>
          </ul>
        </nav>
        <style>{`
          .sidebar {
            width: 240px;
            min-width: 200px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1040;
            height: 100vh;
            background: #212529;
          }
          .hover-nav:hover, .nav-link.active {
            background: #0dcaf0;
            color: #212529 !important;
            transition: background 0.2s, color 0.2s;
          }
          @media (max-width: 991px) {
            .sidebar {
              width: 100%;
              height: auto;
              position: relative;
            }
            .sidebar-header {
              justify-content: start;
            }
            .navbar-brand {
              margin-left: 1rem;
            }
          }
        `}</style>
      </aside>
    );
  }
}

export default Navbar;
