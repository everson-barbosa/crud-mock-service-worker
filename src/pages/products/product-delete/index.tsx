import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes"
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteProduct } from "../../../hooks/api/products/use-delete-product"
import { useFetchProducts } from "../../../hooks/api/products/use-fetch-products"
import { useState } from "react"

export const ProductDeletePage = () => {
    const { requestAPI: deleteProduct } = useDeleteProduct()
    const { requestAPI: fetchProducts } = useFetchProducts()
    const navigate = useNavigate()
    const { productId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClickToCancel = () => {
        navigate(-1)
    }

    const handleClickToDelete = async () => {
        setIsSubmitting(true)
        if (productId) {
            try {
                await deleteProduct({ id: productId })
                navigate('/products')
                await fetchProducts()
            } catch (err) {
                console.error(err)
            }
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
                    <Button variant="soft" color="gray" onClick={handleClickToCancel} disabled={isSubmitting}>
                    Cancelar
                    </Button>
                </AlertDialog.Cancel>
                <Button variant="solid" color="red" onClick={handleClickToDelete} disabled={isSubmitting}>
                    Deletar
                    {isSubmitting && <Spinner />}
                </Button>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}