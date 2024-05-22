import { Skeleton, Table } from "@radix-ui/themes"

interface ProductsTableLoadingProps {
  quantity: number
}

export const ProductsTableLoading = ({ quantity }: ProductsTableLoadingProps) => 
  <>
    {
      Array.from({ length: quantity }).map((_, index) =>                 
        <Table.Row key={index}>
            <Table.RowHeaderCell><Skeleton /></Table.RowHeaderCell>
            <Table.Cell><Skeleton /></Table.Cell>
            <Table.Cell><Skeleton /></Table.Cell>
            <Table.Cell><Skeleton /></Table.Cell>
        </Table.Row>
      )
    }
</>