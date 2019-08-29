import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {addItem} from './cartHelpers'
import Ratings from 'react-ratings-declarative';
import {isAuthenticated} from '../auth'
import {getReviews, processPayment} from './apiCore'
import {deleteReview, addToWishlist, removeFromWishlist, getUserWishlist} from '../user/apiUser'
import NumericalInput from './NumericalInput';
import AddToCartBtn from './AddToCartBtn'
import ProductDetailImage from './ProductDetailImage'
import ColorGuideModal from './ColorGuideModal';
import TextureGuideModal from './TextureGuideModal';
import OrderSampleModal from './OrderSampleModal';
import ProductDetailInfoChart from './ProductDetailInfoChart'
import ProductDescription from './ProductDescription';
import ReviewsSection from './ReviewsSection'
import { HashLink as Link } from 'react-router-hash-link';

const ProductDetail = ({ product, productId, props }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(1)
    const [boxQty, setBoxQty] = useState(1)
    const [show, setShow] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const {user, token} = isAuthenticated()
    const [error, setError] = useState(false)
    const [reviews, setReviews] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [totalPoints, setTotalPoints] = useState(1)
    const [favorited, setFavorited] = useState(false)
    const [avgRating, setAvgRating] = useState(1)
    const [showCGuide, setShowCGuide] = useState(false)
    const [showSampModal, setShowSampModal] = useState(false)
    const [showTGuide, setShowTGuide] = useState(false)


    const loadUserWishlist = () => {
        getUserWishlist(user._id, token).then((data) => {
            if(data.error) {
                setError(true)
                setWishlist([])
            } else {
                data.forEach(element => {
                    if(element._id == props.match.params.productId) {
                        setFavorited(true)
                        setWishlist(data)
                    } else {
                        // setFavorited(false)
                        setWishlist(data)
                    }
                });
            }
        })
    }

    const loadReviews = () => {
        getReviews(productId).then((data) => {
            if(data.error) {
                setError(true)
            } else {
                setReviews(data)
                console.log("load reviews has been called")
            }
        })
    }

    

    const handleChange = (e) => {
        if (e.target.value <= 0) {
            return 1
        } 
        let boxesNeeded = e.target.value / product.sqFootPerBox
        let roundedValue = Math.round(boxesNeeded)
        setBoxQty(roundedValue)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setCount(boxQty)
        setShow(false)
    }
    const addToCart = () => {
        addItem(product, count, () => {
            setRedirect(true)
        })
    }
    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    }
    const calculateAvgRating = (arr) => {
        let length = arr.length
        let sumOfArr = arr.reduce((a, b) => a + b, 0)
        let potentialPoints = length * 5
        let starsValue = (sumOfArr / potentialPoints) * 5
        setTotalPoints(potentialPoints)
        setAvgRating(starsValue)
    }

    const destroy = reviewId  => {
        deleteReview(reviewId, user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadReviews()
                
            }
        })
    }
    const inStock = () => {
        return <span>
                    <i className="far fa-check-circle" 
                        style={{color: 'green'}}>
                    </i> this item is currently in stock!
                </span>
    }
    const outOfStock = () => {
        return <span>
                    <i className="fas fa-times-circle" 
                        style={{color: 'red'}}>
                    </i> this item is currently out of stock.
                </span>
    }

    const addToFavorites = () => {
        addToWishlist(user._id, token, product).then(data => {
            if(data.error) {
                setError(true)
            } else {
                setFavorited(true)
            }
        }) 
    }
    const removeFromFavorites = () => {
        removeFromWishlist(productId, user._id, token).then(data => {
            if(data.error) {
                setError(true)
            } else {
                setFavorited(false)
            }
        })
    }

    const addToWishlistButton = () => {
        return <span onClick={() => {addToFavorites()}}>
            <i style={{color: 'red', cursor: 'pointer'}} className="far fa-heart"></i> add to wishlist
        </span>
    }
    const removeFromWishlistButton = () => {
        return <span onClick={() => {removeFromFavorites()}}>
            <i style={{color: 'red', cursor: 'pointer'}} className="fas fa-heart"></i> remove from wishlist
        </span>
    }
    const isFloat = (n) => {
        return n === +n && n !== (n|0);
    }
    const isInteger = (n) => {
        return n === +n && n === (n|0);
    }
    const showAvgRating = () => (
        <Link to={isAuthenticated() ? '#reviews' : "/login"}>
             <Ratings
            rating={isInteger(avgRating) || isFloat(avgRating) ? avgRating : 0}
            widgetRatedColors="#bf9936"
            widgetDimensions="20px"
            widgetSpacings="2px">
            
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
        </Ratings>
        </Link>
       
    )
    const showSampleDisclaimer = () => (
        <div    className="mt-4 mb-4" 
                style={{textAlign: 'justify'}}>
                            sample swatch available upon request.
        </div>
    )
    const available = () => (
        <span className="addtocart">
                <AddToCartBtn addToCart={addToCart} />
                <NumericalInput count={count}/>
        </span>
    )
    

    useEffect(() => {
        
        isAuthenticated() ? loadUserWishlist() : setWishlist([])
        loadReviews()
    }, [])

    return (
        <div className="container">
            <div className="modal-condition">
                <div className="row product-detail-row1">
                    {/* Product Image */}
                    <div className="col-sm-6 product-detail-image">   
                        {shouldRedirect(redirect)}
                        <ProductDetailImage product={product} 
                                            showImageModal={showImageModal} 
                                            setShowImageModal={setShowImageModal}/>
                    </div>
                    {/* Product Info */}
                    <div className="col-sm-6 product-detail-info">
                        <div className="product-detail-header">
                            <h2 style={{textTransform: 'uppercase'}} onClick={() => {console.log(props.match.params)}}>{product.SGname}</h2>
                        </div>
                        <div className="product-detail-sizes">
                            <h2>{`${product.width}" x ${product.length}" x ${product.thickness}"`}</h2>
                        </div>
                        <div className="product-detail-header">
                                {showAvgRating()}
                                <span>
                                    <em className="ml-2">{isNaN(avgRating) ? 
                                                        <span>leave a review</span> : 
                                                        avgRating.toFixed(1)}
                                    </em>
                                </span>
                        </div>
                        {showSampleDisclaimer()}
                        <div className="product-color-variation">
                            <div className="order-sample">
                                <p onClick={() => {setShowSampModal(!showSampModal)}}>order sample</p>
                            </div>
                            <OrderSampleModal showSampModal={showSampModal} 
                                                    setShowSampModal={setShowSampModal} />
                            <div className="cv-texture">
                                {/* Color Variation Guide Modal */}
                                <ColorGuideModal showCGuide={showCGuide} 
                                                setShowCGuide={setShowCGuide} />
                                <p className="mr-4 cv" 
                                    onClick={() => {setShowCGuide(!showCGuide)}}>
                                    {product.colorVariation}
                                </p>
                                {/* Texture Variation Guide Modal */}
                                <TextureGuideModal showTGuide={showTGuide} 
                                                    setShowTGuide={setShowTGuide} />
                                <p className="texture" onClick={() => {setShowTGuide(!showTGuide)}}>
                                    {product.textureVariation}
                                </p>
                            </div>
                        </div>
                        <div className="product-detail-inner-container">
                            <div className="product-detail-prices">
                                <div className="persf">
                                    <div>
                                        <span>{`$${product.SGPricePerSF}`}</span><span className="persf-unit">/sf</span>
                                    </div>
                                    <div>
                                        <span>{`$${product.SGPricePerPiece}`}</span><span className="persf-unit">/pc</span>
                                    </div>
                                </div>
                                    <div className="d-flex flex-column perbox persf" 
                                        style={{width: '100%'}}>
                                        <ProductDetailInfoChart product={product} 
                                                                show={show} 
                                                                setShow={setShow} 
                                                                handleChange={handleChange} 
                                                                handleSubmit={handleSubmit}/>
                                        <div className="addtocart-container">
                                            {product.Quantity > 1 ? 
                                            available() : 
                                            null}
                                        </div>
                                        <div className="stock-status-container">
                                            <div className="stock-status mt-4">
                                                <div className="stock-social-row">
                                                {product.Quantity > 1 ? 
                                                inStock() : 
                                                outOfStock()}


                                                </div>
                                                


                                                
                                            <span>
                                                <i className="fas fa-shipping-fast"></i> $10 flat rate shipping
                                            </span>
                                            <span>
                                                {/* <i className="fas fa-undo-alt"></i> 365 day returns */}
                                            </span>
                                            
                                            {favorited && isAuthenticated() ? removeFromWishlistButton() : isAuthenticated() ? addToWishlistButton() : null}
                                            
                                            



                                        </div>
                                    </div> 
                                </div>                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Description / Reviews */}
            <div className="row text-center mt-5">
                <div className="col-sm-12">
                    {/* Description */}
                    <ProductDescription product={product} />
                    {/* Reviews */}
                    <ReviewsSection reviews={reviews} 
                                    destroy={destroy}
                                    loadReviews={loadReviews}
                                    
                                    calculateAvgRating={calculateAvgRating} 
                                    productId={productId} 
                                    user={user} 
                                    token={token}/>
                </div>
            </div>               
        </div>
    )
}

export default ProductDetail