"use client"

import { useState } from "react"

type ClienteStats = {
  nome: string
  quantidadeCompras: number
  valorTotal: number
}

type ItemStats = {
  nome: string
  tipo: string
  quantidade: number
}

type PetStats = {
  tipo: string
  raca: string
  quantidade: number
}

function Estatisticas () {
  const [topClientesQuantidade] = useState<ClienteStats[]>([
    { nome: "Maria Oliveira", quantidadeCompras: 12, valorTotal: 3200 },
    { nome: "João Silva", quantidadeCompras: 10, valorTotal: 2800 },
    { nome: "Pedro Oliveira", quantidadeCompras: 8, valorTotal: 2100 },
    { nome: "Ana Souza", quantidadeCompras: 7, valorTotal: 1900 },
    { nome: "Carlos Lima", quantidadeCompras: 6, valorTotal: 1700 },
    { nome: "Lucas Costa", quantidadeCompras: 5, valorTotal: 1500 },
    { nome: "Fernanda Dias", quantidadeCompras: 4, valorTotal: 1200 },
    { nome: "Paula Mendes", quantidadeCompras: 3, valorTotal: 900 },
    { nome: "Rafael Alves", quantidadeCompras: 2, valorTotal: 700 },
    { nome: "Juliana Rocha", quantidadeCompras: 2, valorTotal: 650 },
  ])

  const [topClientesValor] = useState<ClienteStats[]>([
    { nome: "Maria Oliveira", quantidadeCompras: 12, valorTotal: 3200 },
    { nome: "João Silva", quantidadeCompras: 10, valorTotal: 2800 },
    { nome: "Pedro Oliveira", quantidadeCompras: 8, valorTotal: 2100 },
    { nome: "Ana Souza", quantidadeCompras: 7, valorTotal: 1900 },
    { nome: "Carlos Lima", quantidadeCompras: 6, valorTotal: 1700 },
  ])

  const [itensMaisConsumidos] = useState<ItemStats[]>([
    { nome: "Ração Premium", tipo: "Produto", quantidade: 32 },
    { nome: "Banho e Tosa", tipo: "Serviço", quantidade: 28 },
    { nome: "Vacina V10", tipo: "Serviço", quantidade: 18 },
    { nome: "Petisco Natural", tipo: "Produto", quantidade: 15 },
    { nome: "Coleira Antipulgas", tipo: "Produto", quantidade: 12 },
  ])

  const [consumoPorTipoRaca] = useState<PetStats[]>([
    { tipo: "Cachorro", raca: "Poodle", quantidade: 15 },
    { tipo: "Cachorro", raca: "Labrador", quantidade: 12 },
    { tipo: "Gato", raca: "Siamês", quantidade: 10 },
    { tipo: "Cachorro", raca: "Bulldog", quantidade: 8 },
    { tipo: "Gato", raca: "Persa", quantidade: 7 },
  ])

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Estatísticas</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card bg-white text-dark shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <i className="bi bi-trophy-fill text-warning me-2"></i>
                  Top 10 Clientes por Quantidade
                </h5>
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th className="text-center">Compras</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topClientesQuantidade.map((c, i) => (
                        <tr key={i}>
                          <td className="fw-bold">{i + 1}</td>
                          <td>{c.nome}</td>
                          <td className="text-center">
                            <span className="badge bg-info text-dark">{c.quantidadeCompras}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white text-dark shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <i className="bi bi-cash-coin text-success me-2"></i>
                  Top 5 Clientes por Valor
                </h5>
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th className="text-end">Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topClientesValor.map((c, i) => (
                        <tr key={i}>
                          <td className="fw-bold">{i + 1}</td>
                          <td>{c.nome}</td>
                          <td className="text-end">
                            <span className="badge bg-success bg-opacity-75">R$ {c.valorTotal.toFixed(2)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white text-dark shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <i className="bi bi-star-fill text-primary me-2"></i>
                  Itens Mais Consumidos
                </h5>
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Tipo</th>
                        <th className="text-center">Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensMaisConsumidos.map((item, i) => (
                        <tr key={i}>
                          <td>{item.nome}</td>
                          <td>
                            <span
                              className={`badge ${item.tipo === "Produto" ? "bg-primary" : "bg-warning text-dark"}`}
                            >
                              {item.tipo}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-info text-dark">{item.quantidade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white text-dark shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <i className="bi bi-emoji-smile text-danger me-2"></i>
                  Consumo por Tipo e Raça de Pet
                </h5>
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Raça</th>
                        <th className="text-center">Consumos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consumoPorTipoRaca.map((pet, i) => (
                        <tr key={i}>
                          <td>{pet.tipo}</td>
                          <td>{pet.raca}</td>
                          <td className="text-center">
                            <span className="badge bg-info text-dark">{pet.quantidade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="alert alert-info mt-5">
          <strong>Análise segmentada:</strong> Os dados acima permitem identificar clientes mais fiéis, produtos e
          serviços de maior demanda e preferências por tipo/raça de pet, auxiliando em campanhas e decisões
          estratégicas.
        </div>
      </div>
    </div>
  )
}

export default Estatisticas
