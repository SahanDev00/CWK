import React, { useEffect } from 'react'
import Cart from '../../components/Cart/Cart'

const CartPage = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <Cart/>
    </div>
  )
}

export default CartPage