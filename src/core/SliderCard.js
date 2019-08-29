import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'

const Card = ({ product, id }) => {
    return (
        <div className="slider-card">
            <Link to={`/product/${product._id}`}>
                <div    className="card-slider text-center" 
                        id={`card-${id}`}>
                        <ShowImage  item={product} 
                                    url="product"/>
                        <div className="slider-product-name">
                  
                                {product.SGname}
                            
                        </div>
                        <button className="btn mt-2 mb-2" 
                                style={{backgroundColor: 'rgba(191, 153, 54, 1)'}}>
                            View Product
                        </button>
                </div>
            </Link>
        </div>
    )
}

export default Card