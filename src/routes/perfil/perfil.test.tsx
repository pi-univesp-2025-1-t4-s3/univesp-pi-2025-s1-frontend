import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { Perfil } from './perfil'

// mock apenas do useLoaderData + Link
vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useLoaderData: () => 'Richard',
    Link: (props: any) => <a href={props.to}>{props.children}</a>
  }
})

// mock do logo
vi.mock('../../assets/components/logo/logo', () => ({
  LogoInariSys: () => <div>Logo</div>
}))

describe('Perfil', () => {
  it('renderiza corretamente com os dados do loader', () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    )

    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.getByText('Olá Richard')).toBeInTheDocument()
  })
})
