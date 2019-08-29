import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import { addItem } from './cartHelpers'

const Card = ({ product }) => {
    const [redirect, setRedirect] = useState(false)

    
    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    }

    return (
        <div>
            <div    className=" text-center" 
                    style={{width: '15rem'}}>
                {shouldRedirect(redirect)}
                <Link to={`/product/${product._id}`}>
                    <ShowImage  item={product} 
                                url="product"/>
                </Link>
                
                    <div className="card-title">
                        <p>{product.SGname}</p>
                        <p><em>${product.SGPricePerSF} / SF</em></p>
                    </div>
                    
            
            </div>
        </div>
        
    )
}

export default Card