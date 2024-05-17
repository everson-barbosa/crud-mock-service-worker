import axios from "axios"
import { APIResponse } from "../../types/core/API-Response"
import { Product } from "../../types/entities/Product"

export interface DeleteProductParams {
    id: string
}

export interface DeleteProductData {
    product: Product
}

export type DeleteProductResponse = APIResponse<DeleteProductData>

export const deleteProduct = async ({ id }: DeleteProductParams): Promise<DeleteProductResponse> => {
    const response = await axios.delete(`http://localhost:3333/api/products/${id}`, {
        headers: {
        'Authorization': `Bearer Token`
        }
    })

    return response.data
}