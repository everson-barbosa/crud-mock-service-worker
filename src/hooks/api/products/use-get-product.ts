import { create } from "zustand";
import { GetProductParams, GetProductData, getProduct } from '../../../services/products/get-product'

interface useGetProductProps {
    data: GetProductData | null
    isLoading: boolean
    isError: boolean
    lastRequest: Date | null
    requestAPI: (params: GetProductParams) => Promise<void>
}

export const useGetProduct = create<useGetProductProps>((set) => ({
    data: null,
    isLoading: false,
    isError: false,
    lastRequest: null,
    requestAPI: async ({ id }: GetProductParams) => {
        set({ isLoading: true, isError: false })

        try {
            const { data } = await getProduct({ id })

            set({ data, lastRequest: new Date() })
        } 
        catch {
            console.error(`Error on get product ${id}`)

            set({ isError: true })
        } 
        finally {
            set({ isLoading: false })
        }
    }
}))