import { delay, http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { Product } from '../../types/entities/Product'

const mockDelayInMilliseconds = 1000

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
    http.get(`${import.meta.env.VITE_API_URL}/api/products`, async () => {
        await delay(mockDelayInMilliseconds)

        return HttpResponse.json({
            data: {
                products: [
                    ...products
                ]
            }
        })
    }),
    http.get(`${import.meta.env.VITE_API_URL}/api/products/:id`, async ({ params }) => { 
        await delay(mockDelayInMilliseconds)

        const { id } = params

        const findedProduct  = products.find(product => product.id === id)

        if (findedProduct) {
            return HttpResponse.json({
                data: {
                    product: findedProduct
                }
            })
        }

        return new HttpResponse(null, {
            status: 404,
            statusText: 'Resource not found.'
        })
    
    }),
    http.post(`${import.meta.env.VITE_API_URL}/api/products`, async ({ request }) => {
        await delay(mockDelayInMilliseconds)

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
    http.delete(`${import.meta.env.VITE_API_URL}/api/products/:id`, async ({ params }) => {
        await delay(mockDelayInMilliseconds)

        const { id } = params

        const findedProduct  = products.find(product => product.id === id)

        if (findedProduct) {

            products = products.filter(product => product.id !== id)
        
            return HttpResponse.json({
                data: {
                    product: findedProduct
                }
            }, {
                status: 200
            }) 
        }

        return HttpResponse.json({
            data: {}
        }, {
            status: 404,
            statusText: 'Resource not found.'
        })
 
    })
]