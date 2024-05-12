import { FormEvent, useEffect } from "react"
import { useHttpStateProducts } from "../../hooks/http-states/use-http-state-products"

export const ProductsListPage = () => {
    const { fetch: fetchProducts, data } = useHttpStateProducts()

    const handleFetchProducts = async () => {
        await fetchProducts()
    }    

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(event)
    }

    useEffect(() => {
        handleFetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(data)

    return (
        <div>
            <h3>Produtos</h3>
            {JSON.stringify(data)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name"></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="price"></label>
                    <input type="text" />
                </div>
                <button type="submit">Enviar</button>
            </form>
            
        </div>
    )
}