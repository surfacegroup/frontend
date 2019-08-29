import React, { useState, useEffect } from 'react'
import { read, listRelated } from './apiCore'
import ProductDetail from './ProductDetail'
import RelatedProductsSlider from './RelatedProductsSlider'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)
    const productId = props.match.params.productId

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        loadSingleProduct(productId)
    }, [props])

    return (
        <div>
            <div className="row">
                <ProductDetail product={product}
                                productId={productId}
                                props={props}
                                key={productId}/>
            </div>
            <RelatedProductsSlider relatedProducts={relatedProduct} />    
        </div>
    )
}

export default Product