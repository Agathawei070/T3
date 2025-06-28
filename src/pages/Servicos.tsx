"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

interface Servico {
  id: number
  nome: string
  categoria: string
  preco: number
  duracao: string
}

function Servicos () {
  const [servicos, setServicos] = useState<Servico[]>([
    { id: 1, nome: "Banho e Tosa", categoria: "higiene", preco: 80.0, duracao: "2 horas" },
    { id: 2, nome: "Consulta Veterinária", categoria: "saude", preco: 150.0, duracao: "1 hora" },
    { id: 3, nome: "Hospedagem", categoria: "hospedagem", preco: 100.0, duracao: "24 horas" },
    { id: 4, nome: "Adestramento Básico", categoria: "treinamento", preco: 200.0, duracao: "1 hora" },
    { id: 5, nome: "Spa Day", categoria: "bem-estar", preco: 120.0, duracao: "3 horas" },
  ])

  const [novoServico, setNovoServico] = useState<Servico>({
    id: 0,
    nome: "",
    categoria: "",
    preco: 0,
    duracao: "",
  })

  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const val = name === "preco" ? Number(value) : value
    setNovoServico((prev) => ({
      ...prev,
      [name]: val,
    }))
  }

  const handleSalvarServico = (e: FormEvent) => {
    e.preventDefault()

    if (modoEdicao) {
      setServicos((prev) => prev.map((s) => (s.id === novoServico.id ? { ...novoServico } : s)))
      setModoEdicao(false)
      setServicoSelecionado(null)
      setNovoServico({ id: 0, nome: "", categoria: "", preco: 0, duracao: "" })
    } else {
      setServicos((prev) => {
        const novoId = prev.length + 1
        const novo = { ...novoServico, id: novoId }
        return [...prev, novo]
      })
      setNovoServico({ id: 0, nome: "", categoria: "", preco: 0, duracao: "" })
    }

    fecharModal()
  }

  const abrirModal = (servico: Servico, editar: boolean) => {
    setServicoSelecionado(editar ? null : servico)
    setNovoServico(editar ? { ...servico } : novoServico)
    setModoEdicao(editar)
    setShowModal(true)
  }

  const fecharModal = () => {
    setServicoSelecionado(null)
    setModoEdicao(false)
    setShowModal(false)
  }

  const abrirModalNovoServico = () => {
    setNovoServico({ id: 0, nome: "", categoria: "", preco: 0, duracao: "" })
    abrirModal({ id: 0, nome: "", categoria: "", preco: 0, duracao: "" }, true)
  }

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Serviços</h2>
          <button
            className="btn btn-info text-dark fw-semibold"
            style={{ background: "#0dcaf0", border: "none" }}
            onClick={abrirModalNovoServico}
          >
            <i className="bi bi-plus-circle me-2"></i> Novo Serviço
          </button>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {servicos.map((s) => (
            <div key={s.id} className="col">
              <div className="card h-100 shadow-sm bg-white text-dark border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{s.nome}</h5>
                  <p>
                    <strong>Categoria:</strong> {s.categoria}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$ {s.preco.toFixed(2)}
                  </p>
                  <p>
                    <strong>Duração:</strong> {s.duracao}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-center gap-2 bg-white border-0">
                  <button className="btn btn-outline-dark btn-sm" onClick={() => abrirModal(s, false)}>
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-outline-warning btn-sm" onClick={() => abrirModal(s, true)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">{modoEdicao ? "Editar Serviço" : "Detalhes do Serviço"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
                </div>
                <div className="modal-body">
                  {modoEdicao ? (
                    <form onSubmit={handleSalvarServico}>
                      <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                          className="form-control bg-secondary text-light border-0"
                          name="nome"
                          value={novoServico.nome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <select
                          className="form-select bg-secondary text-light border-0"
                          name="categoria"
                          value={novoServico.categoria}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="higiene">Higiene</option>
                          <option value="saude">Saúde</option>
                          <option value="hospedagem">Hospedagem</option>
                          <option value="treinamento">Treinamento</option>
                          <option value="bem-estar">Bem-estar</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Preço</label>
                        <input
                          type="number"
                          className="form-control bg-secondary text-light border-0"
                          name="preco"
                          value={novoServico.preco}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Duração</label>
                        <input
                          className="form-control bg-secondary text-light border-0"
                          name="duracao"
                          value={novoServico.duracao}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-success">
                          Salvar
                        </button>
                      </div>
                    </form>
                  ) : (
                    servicoSelecionado && (
                      <div>
                        <p>
                          <strong>Nome:</strong> {servicoSelecionado.nome}
                        </p>
                        <p>
                          <strong>Categoria:</strong> {servicoSelecionado.categoria}
                        </p>
                        <p>
                          <strong>Preço:</strong> R$ {servicoSelecionado.preco.toFixed(2)}
                        </p>
                        <p>
                          <strong>Duração:</strong> {servicoSelecionado.duracao}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Servicos
