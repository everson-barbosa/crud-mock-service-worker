import axios from "axios"
import { APIResponse } from "../../types/core/API-Response"
import { Product } from "../../types/entities/Product"

export interface GetProductParams {
    id: string
}

export interface GetProductData {
    products: Product[]
}

export type GetProductResponse = APIResponse<GetProductData>

export const getProduct = async ({ id }: GetProductParams): Promise<GetProductResponse> => {
    const response = await axios.get(`http://localhost:8080/api/products/${id}`, {
        headers: {
        'Authorization': `Bearer Token`
        }
    })

    return response.data
}