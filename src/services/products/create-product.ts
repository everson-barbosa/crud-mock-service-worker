import axios from "axios"
import { Product } from "../../types/entities/Product"

type CreateProductParams = Omit<Product, 'id'>

export const createProduct = async (params: CreateProductParams) => {
    axios.post('http://localhost:8080/api/products', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}