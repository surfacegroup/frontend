import React, { useState, useEffect } from 'react'
import {getCart} from './cartHelpers'
import {Link} from 'react-router-dom'
import CartItems from './CartItems'
import Checkout from './Checkout'

const Cart = () => {
    const [items, setItems] = useState([])

    const showItems = items => {
        return (
            <div className="text-center mt-4">
                {/* <h2>Shopping Cart</h2> */}
                <hr/>
                {items.map((product, i) => (<CartItems  key={i} 
                                                        product={product}
                                                        setItems={setItems}
                                            />))}
            </div>
        )
    }

    const noItems = () => (
        <div className="mt-5 text-center">
            <h2>Your cart is currently empty</h2>
            <br/>
            <Link to="/shop">Continue Shopping?</Link>
        </div>
    )

    useEffect(() => {
        setItems(getCart())
    }, [])

    return (
        <div className="container-fluid">
             <div className="dash-top">
            <i className="fas fa-user-friends"></i>
            <h2 className="ml-4"><em>Shopping Cart</em></h2>
            </div>
            <div className="row pl-2">
                <div className="col-12">
                    {items.length > 0 ? showItems(items) : noItems()}
                </div>
            </div>
            <div className="row checkout-container">
            <div className="text-center checkout-subcontainer">
                    
                    </div>
                <div className="text-center checkout-subcontainer pr-5">
                    <hr/>
                    <Checkout products={items} />
                </div>
                
            </div>
        </div>
    )
}

export default Cart