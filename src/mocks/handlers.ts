import { http, HttpResponse } from 'msw'

const products = [
    {name: 'Product 1', price: 1.2},
    {name: 'Product 2', price: 1.2},
    {name: 'Product 3', price: null}
]

export const handlers = [
    http.get('http://localhost:8080/api/products', () => 
        HttpResponse.json({
            data: {
                products: [
                    ...products
                ]
            }
        })
    ),
    http.post('http://localhost:8080/api/products', (resolver) => {
        console.log(resolver)
        products.push({ name: 'Product 4', price: 3.1 })

        HttpResponse.json({

        })
    })
]