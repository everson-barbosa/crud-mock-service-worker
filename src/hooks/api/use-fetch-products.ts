import { create } from "zustand";
import { FetchProductsData, fetchProducts } from "../../services/products/fetch-products";

interface useFetchProductsProps {
    data: FetchProductsData | null
    isLoading: boolean
    isError: boolean
    lastRequest: Date | null
    fetch: () => Promise<void>
}

export const useFetchProducts = create<useFetchProductsProps>((set) => ({
    data: null,
    isLoading: false,
    isError: false,
    lastRequest: null,
    fetch: async () => {
        set({ isLoading: true, isError: false })

        try {
            const { data } = await fetchProducts()

            set({ data, lastRequest: new Date() })
        } 
        catch {
            console.error('Error on fetch products')

            set({ isError: true })
        } 
        finally {
            set({ isLoading: false })
        }
    }
}))