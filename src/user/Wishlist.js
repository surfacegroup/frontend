import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth' 
import {getUserWishlist, removeFromWishlist} from './apiUser'
import Card from '../core/Card'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const {
        user: {
        _id,
        name,
        email,
        role
    }} = isAuthenticated()
    
    const {token} = isAuthenticated()

    const init = (userId, token) => {
        getUserWishlist(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setWishlist(data)
                setLoading(false)
            }
        })
    }
    const returnResults = () => {
        if(loading) {
            return (<h1>Loading...</h1>)
        } else {
            return (
                <div className="card-container-shop">
                            {wishlist.map((product, i) => (
                              
                                    <div  style={{position: 'relative'}}>
                                    <Card key={i} product={product}/>
                                     <div style={{position: 'absolute', top: '0', marginTop: '5px', marginLeft: '5px', color: 'red'}} onClick={() => {
                                         removeFromWishlist(product._id, _id, token).then(data => {
                                            if(data.error) {
                                                setError(true)
                                            } else {
                                                init(_id, token)
                                            }
                                        })
                                     }}><i style={{fontSize: '25px'}} className="fas fa-heart"></i></div>
                                    </div>
                                    
                                
                                        
                                       
                                ))} 
                        </div>
            )
        }
        
    }
   
    useEffect(() => {
        init(_id, token)
    }, [])
    
   return (
       <div>
           <div className="dash-top">
            <i className="fas fa-user-friends"></i>
            <h2 className="ml-4"><em>Wishlist</em></h2>
            </div>
            <h2 className="text-center mb-4 mt-4">Favorites</h2>
           <p className="text-center">Here are the products you have archived in you wishlist. Feel free to view the product information by clicking on the product image, or remove the product from your wishlist by clicking the red heart icon.</p>
           {returnResults()}
       </div>
   )
}

export default Wishlist