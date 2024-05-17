import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { Product } from '../../types/entities/Product'

const getProducts = (quantity: number): Product[] => 
    Array.from({ length: quantity }).map(() =>     
        (
            { 
                id: crypto.randomUUID(), 
                name: faker.commerce.productName(), 
                description: faker.commerce.productDescription(), 
                price: Number(faker.commerce.price()) 
            }
        ),
)

let products = getProducts(5)

export const productsHandlers = [
    http.get('http://localhost:3333/api/products', () => 
        HttpResponse.json({
            data: {
                products: [
                    ...products
                ]
            }
        })
    ),
    http.get('http://localhost:3333/api/products/:id', ({ params }) => { 
        const { id } = params

        const findedProduct  = products.find(product => product.id === id)

        if (!findedProduct) {
            return new HttpResponse(null, {
                status: 404,
                statusText: 'Resource not found.'
            })
        }
    
        return HttpResponse.json({
            data: {
                product: findedProduct
            }
        })
    }),
    http.post('http://localhost:3333/api/products', async ({ request }) => {
        const body = await request.json() as Omit<Product, 'id'>

        const product = {
            id: crypto.randomUUID(),
            ...body
        }

        products = [product, ...products]
    
        return HttpResponse.json({
            data: {
                product
            }
        }, {
            status: 201
        })
    }),
    http.delete('http://localhost:3333/api/products/:id', ({ params }) => {
        const { id } = params

        const findedProduct  = products.find(product => product.id === id)

        if (!findedProduct) {
            return HttpResponse.json(null, {
                status: 404,
                statusText: 'Resource not found.'
            }, )
        }

        products = products.filter(product => product.id !== id)
    
        return HttpResponse.json({
            data: {
                product: findedProduct
            }
        }, {
            status: 204
        })
    })
]