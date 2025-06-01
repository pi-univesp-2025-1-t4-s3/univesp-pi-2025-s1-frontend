import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

// 🔁 mocks
vi.mock('../../assets/components/logo/logo', () => ({
  LogoInariSys: () => <div>Logo</div>
}))

import InitialPage from './initial'

describe('InitialPage', () => {
  it('renderiza o logo e o link de login', () => {
    render(
      <BrowserRouter>
        <InitialPage />
      </BrowserRouter>
    )

    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login')
  })
})
