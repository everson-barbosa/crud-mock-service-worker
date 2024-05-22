import { Box, Flex, IconButton, Table } from '@radix-ui/themes'
import { Trash2Icon, ViewIcon } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { Product } from '../../../../types/entities/Product'
import { ProductsTableLoading } from './products-table-loading';


interface ProductsTableProps {
    products: Product[]
    isLoading: boolean
}

export const ProductsTable = ({ products, isLoading }: ProductsTableProps) => {
    const navigate = useNavigate()
    
    const handleClickToViewProductDetails = (id: string) => {
        navigate(`/products/view/${id}`)
    }

    const handleClickToDeleteProduct = (id: string) => {
        navigate(`/products/delete/${id}`)
    }

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Preço</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell />
                </Table.Row>
            </Table.Header>
        
            <Table.Body>
                { isLoading && <ProductsTableLoading quantity={10} /> }
                {
                    !isLoading && products.map(({ id, name, description, price }) =>                 
                        <Table.Row key={id}>
                            <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
                            <Table.Cell>{description}</Table.Cell>
                            <Table.Cell>
                                <Box minWidth='4rem'>
                                {price ? Intl.NumberFormat('pt-BR', {
                                   style: 'currency',
                                   currency: 'BRL',
                                   }).format(price) : '-'}
                                </Box>
                            </Table.Cell>
                            <Table.Cell>
                                <Flex gap="4">
                                    <IconButton className='view-button' variant='ghost' onClick={() => handleClickToViewProductDetails(id)}>
                                        <ViewIcon size={20}/> 
                                    </IconButton>
                                    <IconButton className='delete-button' variant='ghost' color='crimson' onClick={() => handleClickToDeleteProduct(id)}>
                                        <Trash2Icon size={20}/>
                                    </IconButton>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    )
                }
            </Table.Body>
        </Table.Root>
    )
}