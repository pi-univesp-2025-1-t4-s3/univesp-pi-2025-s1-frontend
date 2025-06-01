import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

// 🧪 mocks do React Router
vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useLoaderData: () => [
      { id: 1, nome: 'Produto A' },
      { id: 2, nome: 'Produto B' }
    ],
    Link: (props: any) => <a href={props.to}>{props.children}</a>
  }
})

// 🧪 mocks dos fragmentos
vi.mock('./fragments/table_products', () => ({
  ProductsTable: ({ products }: any) => <div>Table com {products.length} produtos</div>
}))

vi.mock('./fragments/filter_products', () => ({
  ProductsFilter: () => <div>Filtro</div>
}))

vi.mock('./fragments/create_products', () => ({
  CreateProductsButton: () => <button>Criar</button>
}))

import { Products } from './products'

describe('Products', () => {
  it('renderiza corretamente com os dados do loader', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Produtos' })).toBeInTheDocument()
    expect(screen.getByText('Filtro')).toBeInTheDocument()
    expect(screen.getByText('Criar')).toBeInTheDocument()
    expect(screen.getByText('Table com 2 produtos')).toBeInTheDocument()
  })
})
