"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

interface Pet {
  nome: string
  raca: string
  tipo: string
  genero: string
  dono: string
  dataCadastro: string
}

const PET_VAZIO: Pet = {
  nome: "",
  raca: "",
  tipo: "",
  genero: "",
  dono: "",
  dataCadastro: "",
}

const DONOS = [
  "Agatha Wei",
  "Yun Yun Wei",
  "João Silva",
  "Maria Santos",
  "Carlos Lima",
  "Ana Oliveira",
  "Pedro Souza",
  "Fernanda Dias",
  "Lucas Costa",
  "Juliana Rocha",
  "Rafael Alves",
  "Paula Mendes",
]

function Pets() {
  const [busca, setBusca] = useState("")
  const [exibirFormulario, setExibirFormulario] = useState(false)
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null)
  const [editando, setEditando] = useState<Pet | null>(null)
  const [novoPet, setNovoPet] = useState<Pet>({ ...PET_VAZIO })
  const [pets, setPets] = useState<Pet[]>(
    [
      {
        nome: "Buddy Nelson",
        raca: "Fox Paulistinha",
        tipo: "Cão",
        genero: "Macho",
        dono: "Agatha Wei",
        dataCadastro: "2025-06-29",
      },
      {
        nome: "Bartolomeu",
        raca: "Laranja",
        tipo: "Gato",
        genero: "Macho",
        dono: "Yun Yun Wei",
        dataCadastro: "2025-06-29",
      },
    ]
  )

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value)
  }

  const handleNovoPetClick = () => {
    setNovoPet({ ...PET_VAZIO })
    setEditando(null)
    setExibirFormulario(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNovoPet((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSalvarPet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editando) {
      setPets((prev) =>
        prev.map((p) =>
          p === editando
            ? { ...novoPet, dataCadastro: editando.dataCadastro }
            : p
        )
      )
    } else {
      setPets((prev) => [
        ...prev,
        {
          ...novoPet,
          dataCadastro: new Date().toISOString().split("T")[0],
        },
      ])
    }
    setNovoPet({ ...PET_VAZIO })
    setExibirFormulario(false)
    setEditando(null)
  }

  const abrirModalDetalhes = (pet: Pet) => {
    setPetSelecionado(pet)
  }

  const fecharModalDetalhes = () => {
    setPetSelecionado(null)
  }

  const handleEditarPet = (pet: Pet) => {
    setNovoPet({ ...pet })
    setEditando(pet)
    setExibirFormulario(true)
  }

  const handleExcluirPet = (pet: Pet) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o pet "${pet.nome}"?`
      )
    ) {
      setPets((prev) => prev.filter((p) => p !== pet))
    }
  }

  const petsFiltrados = pets.filter((pet) =>
    pet.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div
      className="min-vh-100"
      style={{ background: "#23272b", minHeight: "100vh", padding: "32px 0" }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0 text-light">Pets Cadastrados</h2>
          <button
            className="btn fw-semibold"
            style={{
              background: "#0dcaf0",
              color: "#222",
              border: "none",
              fontWeight: 600,
            }}
            onClick={handleNovoPetClick}
          >
            <i className="bi bi-plus-circle me-1"></i> Novo Pet
          </button>
        </div>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Buscar por nome do pet..."
          value={busca}
          onChange={handleBuscaChange}
          style={{ fontSize: "1.1rem" }}
        />

        {/* Formulário */}
        {exibirFormulario && (
          <div
            className="card mb-4"
            style={{
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <div className="card-body">
              <h4 className="mb-4 fw-semibold">
                {editando ? "Editar Pet" : "Cadastrar Novo Pet"}
              </h4>
              <form onSubmit={handleSalvarPet}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={novoPet.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Raça</label>
                    <input
                      type="text"
                      className="form-control"
                      name="raca"
                      value={novoPet.raca}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Tipo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tipo"
                      value={novoPet.tipo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gênero</label>
                    <select
                      className="form-select"
                      name="genero"
                      value={novoPet.genero}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Macho">Macho</option>
                      <option value="Fêmea">Fêmea</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Dono</label>
                    <select
                      className="form-select"
                      name="dono"
                      value={novoPet.dono}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione</option>
                      {DONOS.map((dono) => (
                        <option key={dono} value={dono}>
                          {dono}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-success">
                      {editando ? "Salvar Alterações" : "Salvar Pet"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="row g-4">
          {petsFiltrados.map((pet, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div
                className="card h-100"
                style={{
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px #0001",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-2">{pet.nome}</h5>
                  <p className="mb-1">
                    <strong>Raça:</strong> {pet.raca}
                  </p>
                  <p className="mb-1">
                    <strong>Tipo:</strong> {pet.tipo}
                  </p>
                  <p className="mb-1">
                    <strong>Gênero:</strong> {pet.genero}
                  </p>
                  <p className="mb-1">
                    <strong>Dono:</strong> {pet.dono}
                  </p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => abrirModalDetalhes(pet)}
                  >
                    Ver Detalhes
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    title="Editar"
                    onClick={() => handleEditarPet(pet)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Excluir"
                    onClick={() => handleExcluirPet(pet)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalhes */}
        {petSelecionado && (
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{
              background: "rgba(0,0,0,0.5)",
              zIndex: 1050,
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content bg-white text-dark">
                <div className="modal-header">
                  <h5 className="modal-title fw-semibold">
                    Detalhes do Pet
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={fecharModalDetalhes}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Nome:</strong> {petSelecionado.nome}
                  </p>
                  <p>
                    <strong>Raça:</strong> {petSelecionado.raca}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {petSelecionado.tipo}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {petSelecionado.genero}
                  </p>
                  <p>
                    <strong>Dono:</strong> {petSelecionado.dono}
                  </p>
                </div>
                <div className="modal-footer bg-white">
                  <button
                    className="btn btn-secondary"
                    onClick={fecharModalDetalhes}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pets
