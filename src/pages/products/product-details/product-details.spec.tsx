import { fireEvent, render, waitFor } from '@testing-library/react'
import { ProductDetailsPage } from '.'
import { useGetProduct } from '../../../hooks/api/products/use-get-product'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'

describe('Product details', () => {
  const mocks = vi.hoisted(() => ({
      useGetProduct: vi.fn(),
      useNavigate: vi.fn()
    })
  )

  beforeEach(() => {
    vi.mock('../../../hooks/api/products/use-get-product', () => ({
        useGetProduct: mocks.useGetProduct,
    }))
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = await importOriginal<typeof import('react-router-dom')>()

      return {
        ...actual,
        useNavigate: mocks.useNavigate
      }
    })
  })
  
  it('should be able render details', async () => {
    const productId = 'f407b62a-6ebc-418c-a579-7ca3f684918a'
    const route = `/products/view/${productId}`
    const mockRequestAPI = vi.fn()

    vi.mocked(useGetProduct).mockReturnValueOnce({
      data: null,
      isError: false,
      isLoading: false,
      requestAPI: mockRequestAPI
    })

    const { queryByText } = render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path='/products/view/:productId' element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(queryByText(/Detalhes do produto/i)).toBeInTheDocument()
    await waitFor(() => {
      expect(mockRequestAPI).toBeCalledTimes(1)
      expect(mockRequestAPI).toHaveBeenCalledWith({ id: productId })
    })
  })

  it('should be able render request when there is no product id', async () => {
    const route = '/products/view'
    const mockRequestAPI = vi.fn()
    const mockNavigate = vi.fn()

    vi.mocked(useGetProduct).mockReturnValueOnce({
      data: null,
      isError: false,
      isLoading: false,
      requestAPI: mockRequestAPI
    })
    vi.mocked(useNavigate).mockImplementationOnce(mockNavigate)

    const { getByText } = render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path='/products/view/' element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    )

    const backButton = getByText(/Voltar/i)

    await waitFor(() => {
      expect(mockRequestAPI).not.toHaveBeenCalled()
    })

    fireEvent.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith('/products')
  })
})