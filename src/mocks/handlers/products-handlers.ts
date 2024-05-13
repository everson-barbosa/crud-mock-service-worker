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

const products = getProducts(5)

export const productsHandlers = [
    http.get('http://localhost:8080/api/products', () => 
        HttpResponse.json({
            data: {
                products: [
                    ...products
                ]
            }
        })
    ),
    http.get('http://localhost:8080/api/products/:id', ({ params }) => { 
        const { id } = params

        const findedProduct  = products.find(product => product.id === id)

        console.log(findedProduct)

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
    http.post('http://localhost:8080/api/products', async (resolver) => {
        const product = await resolver.request.json() as Product

        if (product) {
            products.push({
                ...product,
                id: crypto.randomUUID()
            })
        }

        return new HttpResponse('Saved', {
            status: 201,
            headers: {
              'Content-Type': 'application/json',
            },
          })
    })
]