import React from 'react'
import {isAuthenticated, signout} from '../auth' 
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
    const {user: {
        _id,
        name,
        email,
        role
    }} = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="">
                
                <div className="list-group text-center">
                    <span>
                        <Link   className="nav-link" 
                                to="/admin/orders">View Orders
                        </Link>
                    </span>
                    <span>
                        <Link   className="nav-link" 
                                to="/create/category">Create Category
                        </Link>
                    </span>
                    <span>
                        <Link   className="nav-link" 
                                to="/create/product">Create Product
                        </Link>
                    </span>
                    <span>
                        <Link   className="nav-link" 
                                to="/admin/products">Manage Product
                        </Link>
                    </span>
                    <span className="">
                        <Link   className="nav-link" 
                                to={`/profile/favorites/${_id}`}>
                                    Favorites
                        </Link>
                    </span>
                    <span className="">
                        <Link   className="nav-link" 
                                to={`/admin/subscribers`}>
                                    Subscribers
                        </Link>
                    </span>
                </div>
            </div>
        )
    }

   

    return (
        <div className="container-fluid dash-container">
            <div className="dash-top">
            <i className="fas fa-users-cog"></i>
            <h2 className="ml-4"><em>Admin Dashboard</em></h2>
            </div>
            <div className="dash-bottom">
                <div className="dash-bottom-left">
                    <div className="dash-bottom-left-top">
                        <h2>Links</h2>
                    </div>
                    <div className="dash-bottom-left-bottom">
                    {adminLinks()}
                    </div>
                    
                  
                </div>
                <div className="dash-bottom-right">
                    <h1 className="mt-2 ml-2"><em>{`Greetings, ${name}!`}</em></h1>
                    <span>{email}</span>

                    <span>You are logged in as a user with the role of <strong>administrator</strong>. The admin has the ability to:
                        <div>
                        <ul style={{textAlign: 'left', marginTop: '20px'}}>
                            <li>create products</li>
                            <li>create categories</li>
                            <li>update / delete products</li>
                            <li>update / view order status</li>
                            <li>view favorited products</li>
                            <li>view email subscriber list</li>
                        </ul>
                        </div>
                    </span>
                </div>
            </div>
           
        </div>
    )
}

export default AdminDashboard