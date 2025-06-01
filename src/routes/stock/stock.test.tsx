import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

// Mock do react-router
vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useLoaderData: () => [
      { id: 1, nome: 'Produto A', quantidade: 5 },
      { id: 2, nome: 'Produto B', quantidade: 10 }
    ],
    Link: (props: any) => <a href={props.to}>{props.children}</a>
  }
})

// Mocks dos fragmentos
vi.mock('./fragments/filter_stock', () => ({
  FilterStock: () => <div>Filtro de Estoque</div>
}))
vi.mock('./fragments/stock_table', () => ({
  StockTable: ({ stock }: any) => <div>Tabela com {stock.length} itens</div>
}))

import { Stock } from './stock'

describe('Stock', () => {
  it('renderiza corretamente com os dados carregados', () => {
    render(
      <BrowserRouter>
        <Stock />
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Estoque' })).toBeInTheDocument()
    expect(screen.getByText('Filtro de Estoque')).toBeInTheDocument()
    expect(screen.getByText('Tabela com 2 itens')).toBeInTheDocument()
  })
})
