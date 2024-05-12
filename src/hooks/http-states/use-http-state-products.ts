import { create } from "zustand";
import { FetchProductsData, fetchProducts } from "../../services/products/fetchProducts";

interface useHttpStateProductsProps {
    data: FetchProductsData | null
    isLoading: boolean
    isError: boolean
    fetch: () => Promise<void>
}

export const useHttpStateProducts = create<useHttpStateProductsProps>((set) => ({
    data: null,
    isLoading: false,
    isError: false,
    fetch: async () => {
        set({ isLoading: true, isError: false })

        try {
            const { data } = await fetchProducts()

            set({ data })
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