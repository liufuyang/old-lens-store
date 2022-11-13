import {ProductsContext} from "../../contexts/products.context";
import {useContext} from "react";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.style.scss'

const Shop = () => {
  const {products} = useContext(ProductsContext)

  if (!products) {
    return (
      <div>Loading ... </div>
    )
  }

  return (
    <div className={'products-container'}>
      {
        products.map((product) =>
          (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))
      }
    </div>
  )
}

export default Shop