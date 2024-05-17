/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Code, Container, DataList, Flex, Heading, IconButton } from '@radix-ui/themes'
import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useGetProduct } from '../../../hooks/api/products/use-get-product';
import { ChevronLeft, CopyIcon, Trash2Icon } from 'lucide-react';

export const ProductDetailsPage = () => {
    const navigate = useNavigate()
    const { productId } = useParams();
    
    const { data, requestAPI: getProduct } = useGetProduct()

    const handleClickToBack = () => {
        navigate('/products')
    }

    const handleClickToDelete = () => {
        navigate(`/products/view/${productId}/delete`)
    }

    const findUniqueProduct = async (productId: string) => {
        await getProduct({ id: productId })
    }

    useEffect(() => {
        if (productId) {
            findUniqueProduct(productId)
        }
    }, [productId])

    return (
        <Container size="2" p='4'>
            <Heading my="4">Detalhes do produto</Heading>

            { data &&
             <DataList.Root>
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">Status</DataList.Label>
                    <DataList.Value>
                    <Badge color="jade" variant="soft" radius="full">
                        Em estoque
                    </Badge>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">ID</DataList.Label>
                    <DataList.Value>
                    <Flex align="center" gap="2">
                        <Code variant="ghost">{data?.product.id}</Code>
                        <IconButton
                        size="1"
                        aria-label="Copy value"
                        color="gray"
                        variant="ghost"
                        >
                            <CopyIcon />
                        </IconButton>
                    </Flex>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Nome</DataList.Label>
                    <DataList.Value>{data?.product.name}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Descrição</DataList.Label>
                    <DataList.Value>
                    <DataList.Value>{data?.product.description}</DataList.Value>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Preço</DataList.Label>
                    <DataList.Value>
                    <DataList.Value>
                    {data?.product.price ? Intl.NumberFormat('pt-BR', {
                                   style: 'currency',
                                   currency: 'BRL',
                                   }).format(data.product.price) : '-'}
                    </DataList.Value>
                    </DataList.Value>
                </DataList.Item>
                </DataList.Root>
                }
                <Flex my='4' justify='between'>
                    <Button onClick={handleClickToBack}>
                        <ChevronLeft size={12}/>
                        Voltar
                    </Button>
                    <Button color='crimson' onClick={handleClickToDelete}>
                        <Trash2Icon size={12}/>
                        Deletar
                    </Button>
                </Flex>

                <Outlet />
        </Container>
    )
}