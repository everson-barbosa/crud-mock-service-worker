import { Button, Dialog, Flex, Heading, IconButton, Text, TextArea, TextField, Tooltip } from "@radix-ui/themes"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateProduct } from "../../../hooks/api/products/use-create-product"
import { useFetchProducts } from "../../../hooks/api/products/use-fetch-products"
import { FileJson } from "lucide-react"
import { faker } from "@faker-js/faker"

export const ProductCreatePage = () => {
    const { requestAPI: createProduct } = useCreateProduct()
    const { requestAPI: fetchProducts } = useFetchProducts()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
    })

    const handleClickToFillAutomatic = () => {
        setProduct({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price())
        })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleClickToBack = () => {
        navigate(-1)
    }

    const handleClickToCreate = async () => {
        await createProduct(product)
        await fetchProducts()
        navigate(-1)
    }

    const isSubmitButtonEnabled = !product.name || !product.description || !product.price

    return (
        <Dialog.Root defaultOpen>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Criar produto</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    <Flex justify='between' align='center'>
                        <Heading size='3'>Informe os dados sobre o produto</Heading>
                      
                        <Tooltip content="Preencher automaticamente">
                            <IconButton onClick={handleClickToFillAutomatic}>
                                <FileJson size='20'/>
                            </IconButton>
                        </Tooltip>
                    </Flex>
                </Dialog.Description>

                <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Nome
                    </Text>
                    <TextField.Root
                    value={product.name}
                    name="name"
                    onChange={handleChange}
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Descrição
                    </Text>
                    <TextArea
                    rows={5}
                    value={product.description}
                    name='description'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Preço
                    </Text>
                    <Flex gap='2' align='center' justify='center'>
                        <Text size='2'>R$</Text>
                        <TextField.Root
                        style={{ width: '100%' }}
                        value={product.price}
                        name='price'
                        onChange={handleChange}
                        placeholder="Preço..."
                        type="number"
                        />
                    </Flex>
                </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button color="gray" onClick={handleClickToBack}>
                    Cancelar
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={handleClickToCreate} disabled={isSubmitButtonEnabled}>Criar</Button>
                </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}