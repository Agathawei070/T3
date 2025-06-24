import { Component } from 'react';

class Home extends Component {
  render() {
    const stats = [
      { icon: 'bi-people', label: 'Clientes', value: 124 },
      { icon: 'bi-heart-pulse', label: 'Pets', value: 98 },
      { icon: 'bi-box-seam', label: 'Produtos', value: 32 },
      { icon: 'bi-gear', label: 'Serviços', value: 12 },
      { icon: 'bi-cart', label: 'Vendas', value: 56 },
    ];

    return (
      <div
        className="container-fluid min-vh-100 bg-dark text-light ps-0"
        style={{ minHeight: '100vh' }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: '100vh',
            marginLeft: 240,
            transition: 'margin-left 0.3s',
          }}
        >
          <div className="container">
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-paw-fill display-1 text-info"></i>
              </div>
              <h1 className="fw-bold mb-3">
                Bem-vindo à <span className="text-info">C4P</span>
              </h1>
              <p className="lead mb-4">
                Gerencie seu pet shop de forma{' '}
                <span className="text-info">fácil</span>,{' '}
                <span className="text-info">moderna</span> e{' '}
                <span className="text-info">intuitiva</span>.
                <br />
                Cadastre clientes, pets, produtos, serviços e acompanhe vendas em um
                só lugar!
              </p>
              {/* Dashboard */}
              <div className="row justify-content-center g-4 mb-5">
                {stats.map((stat, i) => (
                  <div key={i} className="col-6 col-sm-4 col-md-2">
                    <div className="card bg-white text-dark shadow-sm border-0 text-center">
                      <div className="card-body py-4">
                        <i
                          className={`bi ${stat.icon} display-6 text-info mb-2`}
                        ></i>
                        <h3 className="fw-bold mb-0">{stat.value}</h3>
                        <div className="small text-uppercase text-secondary">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Botões de navegação */}
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <a
                  href="/clientes"
                  className="btn btn-info text-dark fw-semibold px-4 py-2"
                >
                  <i className="bi bi-people me-2"></i>Clientes
                </a>
                <a
                  href="/pets"
                  className="btn btn-info text-dark fw-semibold px-4 py-2"
                >
                  <i className="bi bi-heart-pulse me-2"></i>Pets
                </a>
                <a
                  href="/produtos"
                  className="btn btn-info text-dark fw-semibold px-4 py-2"
                >
                  <i className="bi bi-box-seam me-2"></i>Produtos
                </a>
                <a
                  href="/servicos"
                  className="btn btn-info text-dark fw-semibold px-4 py-2"
                >
                  <i className="bi bi-gear me-2"></i>Serviços
                </a>
                <a
                  href="/consumo"
                  className="btn btn-info text-dark fw-semibold px-4 py-2"
                >
                  <i className="bi bi-cart me-2"></i>Consumo
                </a>
                <a
                  href="/estatisticas"
                  className="btn btn-info text-dark fw-semibold px-4 py-2"
                >
                  <i className="bi bi-bar-chart-line me-2"></i>Estatísticas
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Responsividade para mobile: reduz marginLeft quando tela for pequena */}
        <style>{`
          @media (max-width: 991px) {
            .container {
              margin-left: 0 !important;
            }
            .sidebar {
              position: relative !important;
              width: 100% !important;
              min-width: unset !important;
              height: auto !important;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
