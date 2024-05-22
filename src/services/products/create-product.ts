import axios from "axios"
import { APIResponse } from "../../types/core/API-Response"
import { Product } from "../../types/entities/Product"

export interface CreateProductRequest {
    name: string
    description: string
    price: number
}

export interface CreateProductData {
    product: Product
}

export type CreateProductResponse = APIResponse<CreateProductData>

export const createProduct = async ({ name, description, price }: CreateProductRequest): Promise<CreateProductResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, 
        {
            name,
            description,
            price
        }, 
        {
            headers: {
            'Authorization': `Bearer Token`
        }
    })

    return response.data
}