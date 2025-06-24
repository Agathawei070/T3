import { Component } from 'react';

interface Pet {
  nome: string;
  especie: string;
  dono: string;
  dataCadastro: string;
  observacoes: string;
}

interface PetsState {
  busca: string;
  novoPet: Pet;
  exibirFormulario: boolean;
  pets: Pet[];
}

class Pets extends Component<{}, PetsState> {
  state: PetsState = {
    busca: '',
    novoPet: {
      nome: '',
      especie: '',
      dono: '',
      dataCadastro: '',
      observacoes: '',
    },
    exibirFormulario: false,
    pets: [
      {
        nome: "Thor",
        especie: "Cachorro",
        dono: "João Silva",
        dataCadastro: "2024-01-01",
        observacoes: "Raça: Golden Retriever",
      },
      {
        nome: "Luna",
        especie: "Gato",
        dono: "Maria Santos",
        dataCadastro: "2024-02-10",
        observacoes: "Muito arisca com estranhos",
      },
    ]
  };

  handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ busca: e.target.value });
  };

  handleNovoPetClick = () => {
    this.setState({ exibirFormulario: !this.state.exibirFormulario });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      novoPet: {
        ...prevState.novoPet,
        [name]: value
      }
    }));
  };

  handleSalvarPet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const novo = {
      ...this.state.novoPet,
      dataCadastro: new Date().toISOString().split('T')[0]
    };

    this.setState(prevState => ({
      pets: [...prevState.pets, novo],
      novoPet: {
        nome: '',
        especie: '',
        dono: '',
        dataCadastro: '',
        observacoes: '',
      },
      exibirFormulario: false
    }));
  };

  render() {
    const { busca, pets, exibirFormulario, novoPet } = this.state;

    const petsFiltrados = pets.filter(pet =>
      pet.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
      <div className="container-fluid min-vh-100 bg-dark text-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Pets Cadastrados</h2>
            <button
              className="btn text-dark fw-semibold"
              style={{ background: '#0dcaf0', border: 'none' }}
              onClick={this.handleNovoPetClick}
            >
              {exibirFormulario ? 'Fechar' : <><i className="bi bi-plus-circle me-2"></i> Novo Pet</>}
            </button>
          </div>

          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome do pet..."
              value={busca}
              onChange={this.handleBuscaChange}
            />
          </div>

          {exibirFormulario && (
            <div className="card mb-4 bg-white text-dark">
              <div className="card-body">
                <h5 className="card-title">Cadastrar Novo Pet</h5>
                <form onSubmit={this.handleSalvarPet}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={novoPet.nome}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Espécie</label>
                      <input
                        type="text"
                        className="form-control"
                        name="especie"
                        value={novoPet.especie}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Dono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="dono"
                        value={novoPet.dono}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Observações</label>
                      <textarea
                        className="form-control"
                        name="observacoes"
                        value={novoPet.observacoes}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-success">Salvar Pet</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {petsFiltrados.map((pet, index) => (
              <div key={index} className="col">
                <div className="card shadow-sm h-100 bg-white text-dark border-0">
                  <div className="card-body">
                    <h5 className="card-title">{pet.nome}</h5>
                    <p><strong>Espécie:</strong> {pet.especie}</p>
                    <p><strong>Dono:</strong> {pet.dono}</p>
                    <p><strong>Data de Cadastro:</strong> {pet.dataCadastro}</p>
                    <p><strong>Observações:</strong> {pet.observacoes}</p>
                  </div>
                  <div className="card-footer text-center bg-white border-0">
                    <button className="btn btn-outline-dark btn-sm">Ver Detalhes</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Pets;
