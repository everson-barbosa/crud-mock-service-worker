import { Box, DropdownMenu, IconButton, Table } from '@radix-ui/themes'
import { EllipsisVertical } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { Product } from '../../../../types/entities/Product'


interface ProductsTableProps {
    products: Product[]
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
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
                {
                    products.map(({ id, name, description, price }) =>                 
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
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <IconButton variant="ghost">
                                        <EllipsisVertical />
                                    </IconButton>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                <DropdownMenu.Item 
                                    onClick={() => handleClickToViewProductDetails(id)}
                                >
                                    Visualizar
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator />

                                <DropdownMenu.Item 
                                    shortcut="⌘ ⌫" 
                                    color="red" 
                                    onClick={() => handleClickToDeleteProduct(id)}
                                >
                                    Deletar
                                </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            </Table.Cell>
                        </Table.Row>
                    )
                }
            </Table.Body>
        </Table.Root>
    )
}