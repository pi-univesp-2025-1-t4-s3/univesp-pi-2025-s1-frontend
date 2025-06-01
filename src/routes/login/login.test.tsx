import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

// 🧪 mocks necessários
vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useActionData: () => null,
    Form: (props: any) => <form {...props}>{props.children}</form>,
  }
})

vi.mock('../../assets/components/logo/logo', () => ({
  LogoInariSys: () => <div>Logo</div>
}))
vi.mock('../../assets/components/message/message', () => ({
  Message: (props: any) => <div>Mensagem: {props.message}</div>
}))
vi.mock('../../assets/components/clickoutside/clickoutside', () => ({
  ClickOutside: () => null
}))

import Login from './login'

describe('Login', () => {
  it('renderiza o formulário e o logo corretamente', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.getByAltText('formulario de login, campo, email')).toBeInTheDocument()
    expect(screen.getByAltText('formulario de login, campo, senha')).toBeInTheDocument()
    expect(screen.getByAltText('formulario de login, botão, autenticar')).toBeInTheDocument()
  })
})
