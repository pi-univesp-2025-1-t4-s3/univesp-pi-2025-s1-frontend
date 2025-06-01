import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

// mock do react-router
vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useLoaderData: () => [
      {
        id: 1,
        data: '2024-06-01',
        itens: [
          {
            id: 1,
            quantidade: 2,
            produto: {
              id: 1,
              nome: 'Produto A',
              preco: 10
            }
          }
        ]
      }
    ],
    Link: (props: any) => <a href={props.to}>{props.children}</a>
  }
})

// mocks dos componentes filhos
vi.mock('./fragments/sales_table', () => ({
  Sales_Table: (props: any) => (
    <div>Tabela com {props.data.length} vendas</div>
  )
}))
vi.mock('./fragments/sales_filter', () => ({
  Sales_Filter: () => <div>Filtro de vendas</div>
}))
vi.mock('./fragments/create_sale', () => ({
  Create_Sale: () => <button>Criar venda</button>
}))

import { Sales } from './sales'

describe('Sales', () => {
  it('renderiza corretamente com as vendas carregadas', () => {
    render(
      <BrowserRouter>
        <Sales />
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vendas' })).toBeInTheDocument()
    expect(screen.getByText('Filtro de vendas')).toBeInTheDocument()
    expect(screen.getByText('Criar venda')).toBeInTheDocument()
    expect(screen.getByText('Tabela com 1 vendas')).toBeInTheDocument()
  })
})
