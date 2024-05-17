import { create } from "zustand";
import { DeleteProductParams, DeleteProductData, deleteProduct } from '../../../services/products/delete-product'

interface useDeleteProductProps {
    data: DeleteProductData | null
    isLoading: boolean
    isError: boolean
    lastRequest: Date | null
    requestAPI: (params: DeleteProductParams) => Promise<void>
}

export const useDeleteProduct = create<useDeleteProductProps>((set) => ({
    data: null,
    isLoading: false,
    isError: false,
    lastRequest: null,
    requestAPI: async ({ id }: DeleteProductParams) => {
        set({ isLoading: true, isError: false })

        try {
            const { data } = await deleteProduct({ id })

            set({ data, lastRequest: new Date() })
        } 
        catch {
            console.error(`Error on delete product ${id}`)

            set({ isError: true })
        } 
        finally {
            set({ isLoading: false })
        }
    }
}))