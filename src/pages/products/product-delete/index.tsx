import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteProduct } from "../../../hooks/api/products/use-delete-product"
import { useFetchProducts } from "../../../hooks/api/products/use-fetch-products"

export const ProductDeletePage = () => {
    const { isLoading, requestAPI: deleteProduct } = useDeleteProduct()
    const { requestAPI: fetchProducts } = useFetchProducts()
    const navigate = useNavigate()
    const { productId } = useParams();

    const handleClickToCancel = () => {
        navigate(-1)
    }

    const handleClickToDelete = async () => {
        if (productId) {
            await deleteProduct({ id: productId })
            await fetchProducts()
            navigate('/products')
        }
    }

    return (
        <AlertDialog.Root defaultOpen>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Deletar produto</AlertDialog.Title>
                <AlertDialog.Description size="2">
                Tem certeza? Depois de deletado você não conseguirá mais acessar as informações sobre o produto.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray" onClick={handleClickToCancel}>
                    Cancelar
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button variant="solid" color="red" onClick={handleClickToDelete}>
                    {isLoading ? 'Deletando...' : 'Deletar'}
                    </Button>
                </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}