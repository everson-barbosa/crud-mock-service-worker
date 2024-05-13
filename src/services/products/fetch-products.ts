import axios from "axios"
import { APIResponse } from "../../types/core/API-Response"
import { Product } from "../../types/entities/Product"

export interface FetchProductsData {
    products: Product[]
}

export type FetchProductsResponse = APIResponse<FetchProductsData>

export const fetchProducts = async (): Promise<FetchProductsResponse> => {
    const response = await axios.get('http://localhost:8080/api/products', {
        headers: {
        'Authorization': `Bearer Token`
        }
    })

    return response.data
}