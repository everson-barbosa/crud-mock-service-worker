/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useFetchProducts } from "../../../hooks/api/products/use-fetch-products"
import { ProductsTable } from "./components/products-table"
import { Container, Callout, Heading, Flex, Button } from '@radix-ui/themes'
import { Info, InfoIcon, PlusIcon } from 'lucide-react'
import { Outlet, useNavigate } from "react-router-dom"

export const ProductsListPage = () => {
    const navigate = useNavigate()
    const { data, isError, lastRequest, requestAPI } = useFetchProducts()   

    const findManyProducts = async () => {
        await requestAPI()
    }

    const handleClickToCreate = () => {
        navigate('/products/create')
    }

    useEffect(() => {
        if (!data) {
            findManyProducts()
        }
    }, [])
    

    return (
        <Container size="2" p='4'>
            <Flex justify='between' align='center' gap='2'>
                <Heading my="4" size='4'>Listagem de produtos</Heading>
                <Button onClick={handleClickToCreate}>
                    <PlusIcon size='14'/>
                    Adicionar
                </Button>
            </Flex>

            <ProductsTable products={data?.products ?? []} />

            { isError && 
                <Callout.Root my='4' variant="surface" color="crimson">
                    <Callout.Icon>
                        <InfoIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Erro ao tentar carregar os produtos
                    </Callout.Text>
                </Callout.Root> }

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

            <Outlet />
        </Container>
    )
}