import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth' 
import {Link} from 'react-router-dom'
import {getPurchaseHistory, getUserWishlist} from './apiUser'
import moment from 'moment'
import Collapsible from 'react-collapsible';

const Dashboard = () => {
    const [history, setHistory] = useState([])

    const {
        user: {
        _id,
        name,
        email,
        role
    }} = isAuthenticated()
    const token = isAuthenticated().token

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setHistory(data)
            }
        })
       
    }

    

    const userLinks = () => {
        return (
            <React.Fragment>
                <div className="text-center mt-2">
                    <span className="">
                        <Link   className="nav-link" 
                                to="/cart">
                                    My Cart
                        </Link>
                    </span>
                    <span className="">
                        <Link   className="nav-link" 
                                to={`/profile/${_id}`}>
                                    Update Profile
                        </Link>
                    </span>
                    <span className="">
                        <Link   className="nav-link" 
                                to={`/profile/favorites/${_id}`}>
                                    Favorites
                        </Link>
                    </span>
                </div>
            </React.Fragment>
        )
    }

  

    const purchaseHistory = (history) => {
        return (
            <div className="dash-bottom-right-orders mt-4">
               
   
                <h2 className="mb-4 mt-2"><u>Order History</u></h2>
                        {history.map((h, i) => {
                            return (
                                
<Collapsible trigger={<div className="user-order-block" style={{fontSize: '15px'}}> 
                            <div className="user-order-block-order-status">
                                <p>Order# <mark style={{backgroundColor: "#BF9936"}}>{h._id}</mark></p>
                                <p className={h.status === "Processing" ? "text-info" : h.status === "Shipped" ? "text-primary" : h.status === "Cancelled" ? "text-danger": h.status === "Delivered" ? "text-success" : "text-warning"}>{h.status}</p>
                            </div>
                            <div className="user-order-block-createdAt">
                                <div>{moment(h.createdAt).fromNow()}</div>
                                <div style={{color: 'green'}}>${h.amount}</div>
                            </div>
                    </div>}
                                        triggerStyle={{
                                                        fontSize: '25px', 
                                                        display: 'flex', 
                                                        justifyContent: 'spaceBetween'}}>
                                        
                                            {h.products.map((p, i) => {
                                                return (
                                                    <div className="user-order-block-products-container">
                                                        <div className="user-order-block-products">
                                                            <div>{p.SGname}</div>
                                                            <div>${p.SGPricePerBox}/box</div>
                                                            <div>Qty:{p.count}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </Collapsible>



                                
                            )
                        })}
                 
                            
                         
                    
               
            </div>
        )
    }

    useEffect(() => {
        init(_id, token)
    }, [])

    return (
        <div className="container-fluid dash-container">
            <div className="dash-top">
            <i className="fas fa-user-friends"></i>
            <h2 className="ml-4"><em>Dashboard</em></h2>
            </div>
            <div className="dash-bottom">
                <div className="dash-bottom-left">
                    <div className="dash-bottom-left-top">
                        <h2>Links</h2>
                    </div>
                    <div className="dash-bottom-left-bottom">
                    {userLinks()}
                    </div>
                    
                  
                </div>
                <div className="dash-bottom-right">
                    <h1 className="mt-2 ml-2"><em>{`Greetings, ${name}!`}</em></h1>
                    <span>{email}</span>

                    <span>Welcome to your user dashboard! We appreciate you taking the time to make an account with Surface Group International.</span>

                    <span>Below is your order history. To view the products associated with that order, simply click on the order to activate a dropdown menu</span>
                    <div>
                    {purchaseHistory(history)}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard