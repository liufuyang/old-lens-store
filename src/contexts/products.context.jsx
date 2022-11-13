import {createContext, useEffect, useState} from "react";
import SHOP_DATA from '../shop-data.json'

export const ProductsContext = createContext(
  {
    products: [],
    setProducts: (v) => {
    }
  }
)

// every context created, has a provider
// children is whatever wrapped inside UserProvider
export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(null)
  const value = {products, setProducts}

  useEffect(() => {
      setProducts(SHOP_DATA)
    }, []
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}