import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import { addItem, updateItem, removeItem, getCart } from './cartHelpers'
import NumericalInput from './NumericalInput';

const CartItems = ({ product, setItems }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const showCartUpdateOptions = () => {
        return (<div style={{width: '130px'}}>
             <NumericalInput style={{
                    input: {
                        paddingLeft: '15ex !important',
                        paddingRight: '15ex !important'
                    }
             }} count={count}/>
                   
                </div>)
    }
    


    const deleteItem = () => {
        removeItem(product._id)
        setItems(getCart())
    }

    const showRemoveButton = () => {
        return (
            <button
                onClick={() => (deleteItem(product._id))}
                className="btn">
                    <i className="fa fa-trash" 
                        style={{color: 'black',
                                fontSize: '28px'}}>
                    </i>
            </button>
        )
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    }
    

    return (
        <React.Fragment>
            <div className="cart-item-container mb-4">
                <Link to={`/product/${product._id}`}>
                    <div className="cart-item-img-title">
                        <div className="cart-item-img"
                            style={{width: '70px'}}>
                            {shouldRedirect(redirect)}
                            <ShowImage item={product} 
                                        url="product" />
                        </div>
                        <p style={{color: 'black'}}>{product.SGname}</p>
                    </div>
                </Link>
                <div style={{display: 'flex'}}>
                {showCartUpdateOptions()}
                {showRemoveButton()}
                </div>     
            </div>
        </React.Fragment>
    )
}

export default CartItems