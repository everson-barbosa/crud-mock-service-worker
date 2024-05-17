import { create } from "zustand";
import { CreateProductRequest, CreateProductData, createProduct } from '../../../services/products/create-product'

interface useCreateProductProps {
    data: CreateProductData | null
    isLoading: boolean
    isError: boolean
    lastRequest: Date | null
    requestAPI: (request: CreateProductRequest) => Promise<void>
}

export const useCreateProduct = create<useCreateProductProps>((set) => ({
    data: null,
    isLoading: false,
    isError: false,
    lastRequest: null,
    requestAPI: async ({ name, description, price }: CreateProductRequest) => {
        set({ isLoading: true, isError: false })

        try {
            const { data } = await createProduct({ name, description, price })

            set({ data, lastRequest: new Date() })
        } 
        catch {
            console.error(`Error on create product`)

            set({ isError: true })
        } 
        finally {
            set({ isLoading: false })
        }
    }
}))