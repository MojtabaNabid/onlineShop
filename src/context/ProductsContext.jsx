import { createContext, useEffect, useState } from "react"

const ProductContext = createContext();

function ProductsProvider({children}) {
    const [porducts, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProducts(await api.get("/products"))
            } catch (error) {
                console.log(error.message)
            }
            
        }
        
        fetchProducts()
    }, [])
  return (
    <ProductContext.Provider value={porducts}>{children}</ProductContext.Provider>
  )

export default ProductsProvider
