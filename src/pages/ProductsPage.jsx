import { useProducts } from "../context/ProductsContext"

function ProductsPage() {
  const products = useProducts()
  console.log(products)

  return (
    <div>
      <h1>Products</h1>
    </div>
  )
}

export default ProductsPage
