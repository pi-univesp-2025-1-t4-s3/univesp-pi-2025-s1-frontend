import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

// mock do Logo
vi.mock('../../assets/components/logo/logo', () => ({
  LogoInariSys: () => <div>Logo</div>
}))

// importa o Menu real
import Menu from './menu'

describe('Menu', () => {
  it('renderiza todos os links corretamente', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    )

    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Produtos')).toBeInTheDocument()
    expect(screen.getByText('Estoque')).toBeInTheDocument()
    expect(screen.getByText('Vendas')).toBeInTheDocument()
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })
})
