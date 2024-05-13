/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Heading } from '@radix-ui/themes'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useGetProduct } from '../../../hooks/api/use-get-product';

export const ProductDetailsPage = () => {
    const { productId } = useParams();
    
    const { data, fetch: fetchProduct } = useGetProduct()


    const findUniqueProduct = async (productId: string) => {
        await fetchProduct({ id: productId })
    }

    useEffect(() => {
        if (productId) {
            findUniqueProduct(productId)
        }
    }, [productId])

    return (
        <Container size="3" my='4'>
            <Heading my="4">Detalhes do produto - {productId}</Heading>
            {JSON.stringify(data)}
        </Container>
    )
}