import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { Product } from '../../types/entities/Product'

const products: Product[] = [
    { id: crypto.randomUUID(), name: faker.commerce.productName(), description: faker.commerce.productDescription(), price: Number(faker.commerce.price()) },
    { id: crypto.randomUUID(), name: faker.commerce.productName(), description: faker.commerce.productDescription(),price: Number(faker.commerce.price()) },
    { id: crypto.randomUUID(), name: faker.commerce.productName(), description: faker.commerce.productDescription(),price: Number(faker.commerce.price()) }
]

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