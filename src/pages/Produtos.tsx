"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

interface Produto {
  id: number
  nome: string
  categoria: string
  preco: number
  estoque: number
}

function Produtos () {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Ração Premium Cães", categoria: "alimentacao", preco: 89.9, estoque: 20 },
    { id: 2, nome: "Shampoo Hipoalergênico", categoria: "higiene", preco: 45.5, estoque: 12 },
  ])

  const [novoProduto, setNovoProduto] = useState<Produto>({
    id: 0,
    nome: "",
    categoria: "",
    preco: 0,
    estoque: 0,
  })

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const val = name === "preco" || name === "estoque" ? Number(value) : value
    setNovoProduto((prev) => ({
      ...prev,
      [name]: val,
    }))
  }

  const handleSalvarProduto = (e: FormEvent) => {
    e.preventDefault()

    if (modoEdicao) {
      setProdutos((prev) => prev.map((p) => (p.id === novoProduto.id ? { ...novoProduto } : p)))
      setModoEdicao(false)
      setProdutoSelecionado(null)
      setNovoProduto({ id: 0, nome: "", categoria: "", preco: 0, estoque: 0 })
    } else {
      setProdutos((prev) => {
        const novoId = prev.length + 1
        const novo = { ...novoProduto, id: novoId }
        return [...prev, novo]
      })
      setNovoProduto({ id: 0, nome: "", categoria: "", preco: 0, estoque: 0 })
    }

    fecharModal()
  }

  const abrirModal = (produto: Produto, editar: boolean) => {
    setProdutoSelecionado(editar ? null : produto)
    setNovoProduto(editar ? { ...produto } : novoProduto)
    setModoEdicao(editar)
    setShowModal(true)
  }

  const fecharModal = () => {
    setProdutoSelecionado(null)
    setModoEdicao(false)
    setShowModal(false)
  }

  const abrirModalNovoProduto = () => {
    setNovoProduto({ id: 0, nome: "", categoria: "", preco: 0, estoque: 0 })
    abrirModal({ id: 0, nome: "", categoria: "", preco: 0, estoque: 0 }, true)
  }

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Produtos</h2>
          <button
            className="btn text-dark fw-semibold"
            style={{ background: "#0dcaf0", border: "none" }}
            onClick={abrirModalNovoProduto}
          >
            <i className="bi bi-plus-circle me-2"></i> Novo Produto
          </button>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {produtos.map((p) => (
            <div key={p.id} className="col">
              <div className="card h-100 shadow-sm bg-white text-dark border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{p.nome}</h5>
                  <p className="card-text">
                    <strong>Categoria:</strong> {p.categoria}
                  </p>
                  <p className="card-text">
                    <strong>Preço:</strong> R$ {p.preco.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Estoque:</strong> {p.estoque}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-center gap-2 bg-white border-0">
                  <button className="btn btn-outline-dark btn-sm" onClick={() => abrirModal(p, false)}>
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-outline-warning btn-sm" onClick={() => abrirModal(p, true)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Bootstrap */}
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
                  <h5 className="modal-title">{modoEdicao ? "Editar Produto" : "Detalhes do Produto"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
                </div>
                <div className="modal-body">
                  {modoEdicao ? (
                    <form onSubmit={handleSalvarProduto}>
                      <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                          className="form-control bg-secondary text-light border-0"
                          name="nome"
                          value={novoProduto.nome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <select
                          className="form-select bg-secondary text-light border-0"
                          name="categoria"
                          value={novoProduto.categoria}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="alimentacao">Alimentação</option>
                          <option value="higiene">Higiene</option>
                          <option value="acessorios">Acessórios</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Preço</label>
                        <input
                          type="number"
                          className="form-control bg-secondary text-light border-0"
                          name="preco"
                          value={novoProduto.preco}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Estoque</label>
                        <input
                          type="number"
                          className="form-control bg-secondary text-light border-0"
                          name="estoque"
                          value={novoProduto.estoque}
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
                    produtoSelecionado && (
                      <div>
                        <p>
                          <strong>Nome:</strong> {produtoSelecionado.nome}
                        </p>
                        <p>
                          <strong>Categoria:</strong> {produtoSelecionado.categoria}
                        </p>
                        <p>
                          <strong>Preço:</strong> R$ {produtoSelecionado.preco.toFixed(2)}
                        </p>
                        <p>
                          <strong>Estoque:</strong> {produtoSelecionado.estoque}
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

export default Produtos
