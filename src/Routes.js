import React, {useState}  from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './user/Login'
import Home from './core/Home'
import Nav from './core/Nav'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard';
import Review from './user/Review';
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Contact from './core/Contact'
import About from './core/About'
import Footer from './core/Footer'
import Orders from './admin/Orders'
import Subscribers from './admin/Subscribers'
import Profile from './user/Profile'
import Wishlist from './user/Wishlist'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import './App.css'
import './Responsive.css'
import ScrollToTop from './core/ScrollToTop'


const Routes = () => {
    const [navOpen, setNavOpen] =  useState(false)
    const hamburgerClicked = () => {
        setNavOpen(!navOpen)
        console.log(navOpen)
    }
    
  
    
    return (
    <BrowserRouter>
    <ScrollToTop>
    <Nav hamburgerClicked={hamburgerClicked} navOpen={navOpen} />
    
        
        
        
       
    <div className="content">
        <Switch>
            
       
            
            <Route path="/" exact component={Home}></Route>
            <Route path="/shop" exact component={Shop}></Route>
            <Route path="/contact" exact component={Contact}></Route>
            <Route path="/about" exact component={About}></Route>
            <Route path="/cart" exact component={Cart}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/product/:productId" exact component={Product}></Route>
            <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
            <PrivateRoute path="/profile/:userId" exact component={Profile}/>
            <PrivateRoute path="/profile/favorites/:userId" exact component={Wishlist}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/admin/products" exact component={ManageProducts}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={AddProduct}/>
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
            <AdminRoute path="/admin/orders" exact component={Orders}/>
            <AdminRoute path="/admin/subscribers" exact component={Subscribers}/>
           
        </Switch>
        </div>
        <Footer/>
        </ScrollToTop>
    </BrowserRouter>)
}

export default Routes