import { Box, Container, Text } from "@radix-ui/themes"
import { Link } from "react-router-dom"

export const RootPage = () => {
    return (
        <Container size='2' p='4'>
            <Text size='8'>Mock Service Worker</Text>
            <Box my='4'>
                <Link to='/products'>Lista de produtos</Link>
            </Box>
        </Container>
    )
}