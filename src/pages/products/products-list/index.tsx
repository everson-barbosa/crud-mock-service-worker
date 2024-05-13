/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useFetchProducts } from "../../../hooks/api/use-fetch-products"
import { ProductsTable } from "./components/products-table"
import { Container, Callout, Heading } from '@radix-ui/themes'
import { Info } from 'lucide-react'

export const ProductsListPage = () => {
    const { data, lastRequest, fetch: fetchProducts } = useFetchProducts()   

    const findManyProducts = async () => {
        await fetchProducts()
    }

    useEffect(() => {
        if (!data) {
            findManyProducts()
        }
    }, [])

    return (
        <Container size="3">
            <Heading my="4">Listagem de produtos</Heading>

            <ProductsTable products={data?.products ?? []} />

            { lastRequest && 
                <Callout.Root my='4'>
                    <Callout.Icon>
                        <Info />
                    </Callout.Icon>
                    <Callout.Text>
                        Última requisição: {lastRequest.toISOString()}
                    </Callout.Text>
                </Callout.Root>
            }
        </Container>
    )
}