import { ProductsListPage } from "./products-list"
import { render } from '@testing-library/react'

describe('Pages > Products > Products list', () => {
    it('should be able to render a component', () => {
        const { queryByText } = render(<ProductsListPage />)

        expect(queryByText('Teste')).not.toBeInTheDocument()
    })
})