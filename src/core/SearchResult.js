import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import { addItem } from './cartHelpers'

const SearchResult = ({ product }) => {
    const [redirect, setRedirect] = useState(false)

    const addToCart = () => {
        addItem(product, 1, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    }

    return (
        <div className="search-result mb-4">

            <div className="search-result-title-img">
                <div className="search-result-title">
                    {product.SGname}
                </div>
                <span    className="search-result-img" 
                        style={{width: '40px', 
                                marginRight: '20px'}}>
                {shouldRedirect(redirect)}
                <ShowImage item={product} 
                            url="product"/>
                </span>
            </div>

            <span className="buttons-view-cart">
                <Link to={`/product/${product._id}`}>
                    <button className="view-product-btn">
                        View Product
                    </button>
                </Link>
                <button className="add-to-cart-btn"
                        onClick={addToCart}>
                        Add to Cart
                </button>
            </span>
    
        </div> 
    )
}

export default SearchResult