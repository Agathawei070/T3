"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

interface Cliente {
  nome: string
  email: string
  telefone: string
  cpf: string
  dataCadastro: string
  observacoes: string
  endereco?: {
    estado?: string
    cidade?: string
    bairro?: string
    rua?: string
    numero?: string
    complemento?: string
    cep?: string
    ddd?: string
    nomeSocial?: string
  }
  pets?: {
    nome: string
    tipo: string
    raca: string
    genero: string
  }[]
}

const CLIENTE_VAZIO: Cliente = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  dataCadastro: "",
  observacoes: "",
  endereco: {
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    cep: "",
    ddd: "",
    nomeSocial: "",
  },
  pets: [],
}

function Clientes() {
  const [busca, setBusca] = useState("")
  const [exibirFormulario, setExibirFormulario] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [editando, setEditando] = useState<Cliente | null>(null)
  const [novoCliente, setNovoCliente] = useState<Cliente>({ ...CLIENTE_VAZIO })
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      nome: "Agatha Wei",
      email: "agatha.wei@gmail.com",
      telefone: "(12) 981613594",
      cpf: "48044195866",
      dataCadastro: "2025-06-29",
      observacoes: "",
      endereco: {
        estado: "SP",
        cidade: "São Jose dos Campos",
        bairro: "Jardim Por do Sol",
        rua: "Sergio Gonzaga de Azevedo",
        numero: "201",
        complemento: "Casa",
        cep: "12241340",
        ddd: "12",
        nomeSocial: "",
      },
      pets: [
        {
          nome: "Buddy Nelson",
          tipo: "Cão",
          raca: "Fox Paulistinha",
          genero: "Macho",
        },
      ],
    },
    {
      nome: "Yun Yun Wei",
      email: "Yunyunwei@live.com",
      telefone: "(12) 982168303",
      cpf: "360593000000",
      dataCadastro: "2025-06-29",
      observacoes: "",
      endereco: {
        estado: "SP",
        cidade: "São Jose dos Campos",
        bairro: "Jardim Por do Sol",
        rua: "Sergio Gonzaga de Azevedo",
        numero: "201",
        complemento: "Casa",
        cep: "12241340",
        ddd: "12",
        nomeSocial: "",
      },
      pets: [
        {
          nome: "Bartolomeu",
          tipo: "Gato",
          raca: "Laranja",
          genero: "Macho",
        },
      ],
    },
  ])

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value)
  }

  const handleNovoClienteClick = () => {
    setNovoCliente({ ...CLIENTE_VAZIO })
    setEditando(null)
    setExibirFormulario(true)
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (
      [
        "estado",
        "cidade",
        "bairro",
        "rua",
        "numero",
        "complemento",
        "cep",
        "ddd",
        "nomeSocial",
      ].includes(name)
    ) {
      setNovoCliente((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: value },
      }))
    } else {
      setNovoCliente((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSalvarCliente = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editando) {
      setClientes((prev) =>
        prev.map((c) =>
          c === editando
            ? {
                ...novoCliente,
                dataCadastro: editando.dataCadastro,
                pets: editando.pets,
              }
            : c
        )
      )
    } else {
      setClientes((prevClientes) => [
        ...prevClientes,
        {
          ...novoCliente,
          dataCadastro: new Date().toISOString().split("T")[0],
        },
      ])
    }
    setNovoCliente({ ...CLIENTE_VAZIO })
    setExibirFormulario(false)
    setEditando(null)
  }

  const abrirModalDetalhes = (cliente: Cliente) => {
    setClienteSelecionado(cliente)
  }

  const fecharModalDetalhes = () => {
    setClienteSelecionado(null)
  }

  const handleEditarCliente = (cliente: Cliente) => {
    setNovoCliente({
      ...cliente,
      endereco: { ...CLIENTE_VAZIO.endereco, ...cliente.endereco },
    })
    setEditando(cliente)
    setExibirFormulario(true)
  }

  const handleExcluirCliente = (cliente: Cliente) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`
      )
    ) {
      setClientes((prev) => prev.filter((c) => c !== cliente))
    }
  }

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  )

  // Layout
  return (
    <div
      className="min-vh-100"
      style={{ background: "#23272b", minHeight: "100vh", padding: "32px 0" }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0 text-light">Clientes Cadastrados</h2>
          <button
            className="btn fw-semibold"
            style={{
              background: "#0dcaf0",
              color: "#222",
              border: "none",
              fontWeight: 600,
            }}
            onClick={handleNovoClienteClick}
          >
            <i className="bi bi-plus-circle me-1"></i> Novo Cliente
          </button>
        </div>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Buscar por nome..."
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
                {editando ? "Editar Cliente" : "Cadastrar Novo Cliente"}
              </h4>
              <form onSubmit={handleSalvarCliente}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={novoCliente.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nome Social (opcional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nomeSocial"
                      value={novoCliente.endereco?.nomeSocial || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={novoCliente.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">DDD</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ddd"
                      value={novoCliente.endereco?.ddd || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefone"
                      value={novoCliente.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Estado</label>
                    <input
                      type="text"
                      className="form-control"
                      name="estado"
                      value={novoCliente.endereco?.estado || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Cidade</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cidade"
                      value={novoCliente.endereco?.cidade || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Bairro</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bairro"
                      value={novoCliente.endereco?.bairro || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Rua</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rua"
                      value={novoCliente.endereco?.rua || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Número</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numero"
                      value={novoCliente.endereco?.numero || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Complemento</label>
                    <input
                      type="text"
                      className="form-control"
                      name="complemento"
                      value={novoCliente.endereco?.complemento || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CEP</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cep"
                      value={novoCliente.endereco?.cep || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CPF</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cpf"
                      value={novoCliente.cpf}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Observações</label>
                    <textarea
                      className="form-control"
                      name="observacoes"
                      value={novoCliente.observacoes}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-success">
                      {editando ? "Salvar Alterações" : "Salvar Cliente"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="row g-4">
          {clientesFiltrados.map((cliente, index) => (
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
                  <h5 className="card-title mb-2">{cliente.nome}</h5>
                  <p className="mb-1">
                    <strong>E-mail:</strong> {cliente.email}
                  </p>
                  <p className="mb-1">
                    <strong>Data de Cadastro:</strong>{" "}
                    {new Date(cliente.dataCadastro).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => abrirModalDetalhes(cliente)}
                  >
                    Ver Detalhes
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    title="Editar"
                    onClick={() => handleEditarCliente(cliente)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Excluir"
                    onClick={() => handleExcluirCliente(cliente)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalhes */}
        {clienteSelecionado && (
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
                    Detalhes do Cliente
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={fecharModalDetalhes}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Nome:</strong> {clienteSelecionado.nome}
                  </p>
                  {clienteSelecionado.email && (
                    <p>
                      <strong>E-mail:</strong> {clienteSelecionado.email}
                    </p>
                  )}
                  <p>
                    <strong>Data de Cadastro:</strong>{" "}
                    {new Date(
                      clienteSelecionado.dataCadastro
                    ).toLocaleDateString("pt-BR")}
                  </p>
                  {clienteSelecionado.telefone && (
                    <p>
                      <strong>Telefone:</strong>{" "}
                      {clienteSelecionado.endereco?.ddd
                        ? `(${clienteSelecionado.endereco.ddd}) `
                        : ""}
                      {clienteSelecionado.telefone}
                    </p>
                  )}
                  <p>
                    <strong>CPF:</strong> {clienteSelecionado.cpf}
                  </p>
                  {/* Endereço */}
                  {(clienteSelecionado.endereco?.rua ||
                    clienteSelecionado.endereco?.numero ||
                    clienteSelecionado.endereco?.bairro ||
                    clienteSelecionado.endereco?.cidade ||
                    clienteSelecionado.endereco?.estado ||
                    clienteSelecionado.endereco?.cep ||
                    clienteSelecionado.endereco?.complemento) && (
                    <>
                      <strong>Endereço:</strong>
                      <ul className="mb-2">
                        <li>
                          {clienteSelecionado.endereco?.rua
                            ? clienteSelecionado.endereco.rua
                            : ""}
                          {clienteSelecionado.endereco?.numero
                            ? `, ${clienteSelecionado.endereco.numero}`
                            : ""}
                          {clienteSelecionado.endereco?.bairro
                            ? ` - ${clienteSelecionado.endereco.bairro}`
                            : ""}
                          {clienteSelecionado.endereco?.cidade
                            ? `, ${clienteSelecionado.endereco.cidade}`
                            : ""}
                          {clienteSelecionado.endereco?.estado
                            ? ` - ${clienteSelecionado.endereco.estado}`
                            : ""}
                          {clienteSelecionado.endereco?.cep
                            ? `, CEP: ${clienteSelecionado.endereco.cep}`
                            : ""}
                          {clienteSelecionado.endereco?.complemento
                            ? ` (${clienteSelecionado.endereco.complemento})`
                            : ""}
                        </li>
                      </ul>
                    </>
                  )}
                  {/* Pets */}
                  {clienteSelecionado.pets && clienteSelecionado.pets.length > 0 && (
                    <>
                      <strong>Pets:</strong>
                      <ul>
                        {clienteSelecionado.pets.map((pet, i) => (
                          <li key={i}>
                            <strong>Nome:</strong> {pet.nome} |{" "}
                            <strong>Tipo:</strong> {pet.tipo} |{" "}
                            <strong>Raça:</strong> {pet.raca} |{" "}
                            <strong>Gênero:</strong> {pet.genero}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
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

export default Clientes
