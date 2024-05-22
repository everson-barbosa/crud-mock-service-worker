import { render } from "@testing-library/react"
import { ProductsListPage } from './index'
import { MemoryRouter } from "react-router-dom"

describe('Teste', () => {
  it('should be able', () => {
    const route = '/products-list'

    const { queryByText } = render(
      <MemoryRouter initialEntries={[route]}>
        <ProductsListPage />
      </MemoryRouter>)

    expect(queryByText('Listagem de produtos')).toBeInTheDocument()
  })
})