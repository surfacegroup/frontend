import React from 'react'

const AddToCartBtn = (props) => (
<button className="btn mt-4 mb-2 w-100"
        onClick={props.addToCart}
        style={{height: '50px', borderRadius: '0'}}>add to cart
</button>
)

export default AddToCartBtn