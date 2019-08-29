import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'
import NavSideBar from './NavSideBar'
import Overlay from './Overlay'
import '../App.css'
import '../Responsive.css'

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#bf9936'}
    } else {
        return {color: 'black'}
    }
}

class Nav extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div className="nav-container nav-fixed">
                {/* Nav Top */}
                <div    className="nav-top" 
                        id="wrapper" >
                    
                    {/* Hamburger Menu */}
                    <div className="nav-top-left">
                        <div id="menu-bar">
                            <div id="menu" className={this.props.navOpen ? 'change' : null} onClick={this.props.hamburgerClicked}>
                                <div id="bar1" className="bar"></div>
                                <div id="bar2" className="bar"></div>
                                <div id="bar3" className="bar"></div>
                            </div>
                        </div>
                    </div>
                    {/* Logo & Text */}
                    <div className="nav-top-center">
                        <Link   to="/"
                                onClick={this.props.navOpen ? 
                                        this.props.hamburgerClicked : 
                                        null}>

                            <div className="nav-logo">
                                <div className="nav-logo-img">
                                    <img    src="https://surfacegroupint.com/wp-content/uploads/2019/07/log2.png" 
                                             alt="logo"/>
                                </div>
                                <div className="nav-logo-text">
                                    <h2 className="sg">SURFACE GROUP</h2>
                                    <h2 className="i">INTERNATIONAL</h2>
                                </div>
                            </div>

                        </Link>
                
                    </div>
                    {/* Signin, Signup, Dashboard, Signout */}
                    <div className="nav-top-right">
                        {/* Dashboard / Signout */}
                        
                        <div className="dashboard">
                       

                            {/* User Icon*/}
                            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                <div className="nav-item mt-3">
                                    <Link   className="nav-link"
                                            style={isActive(this.props.history, '/user/dashboard')}  
                                            to="/user/dashboard">
                                                <i  className="fas fa-user" 
                                                    style={{fontSize: '40px', 
                                                            marginBottom: '14px'}}>
                                                </i>
                                    </Link>
                                </div>
                            )}

                            {/* Admin Icon */}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <div className="nav-item">
                                    <Link   className="nav-link"
                                            style={isActive(this.props.history, '/admin/dashboard')}  
                                            to="/admin/dashboard">
                                                <i className="fas fa-user-tie pb-4" 
                                                    style={{fontSize: '50px', 
                                                            marginTop: '15px'}}>
                                                </i>
                                    </Link>
                                </div>
                            )}

                            {/* Signout Button (if logged in) */}
                            

                        </div>

                        

                        {/* Signup/Signin/Cart */}
                        <div className="signin-signup-cart">
                            {/* Signup/Signin (logged out) */}
                            <div className="signin-signup">
                            {!isAuthenticated() && (
                                <React.Fragment>
                                    {/* Login */}
                                    <div className="nav-item">
                                        <Link   className="nav-link" 
                                                style={isActive(this.props.history, '/login')}
                                                to="/login">Login
                                        </Link>
                                    </div>
                                    
                                </React.Fragment>
                            )}
                            </div>
                            {/* Cart */}
                            <div>
                                <Link   className="nav-link"
                                        style={isActive(this.props.history, '/cart')}  
                                        to="/cart">
                                    <div className="cart-icon-count">
                                        <i className="fa fa-shopping-cart"></i>
                                        <p>{itemTotal()}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                
                </div>
                
                {/* Responsive Nav */}
                <NavSideBar show={this.props.navOpen} hamburgerClicked={this.props.hamburgerClicked}  />
                <Overlay show={this.props.navOpen} hamburgerClicked={this.props.hamburgerClicked} />
                
                {/* Nav Bottom Links*/}
                <div className="nav-bottom">
                    {/* Home Page */}
                    <div className="nav-item">
                        <Link   className="nav-link"
                                style={isActive(this.props.history, '/')}  
                                to="/">
                                    <p>home</p>
                        </Link>
                    </div>

                    {/* About Page */}
                    <div className="nav-item">
                        <Link   className="nav-link" 
                                style={isActive(this.props.history, '/about')}  
                                to="/about"><p>about</p>
                        </Link>
                    </div>

                    {/* Shop Page */}
                    <div className="nav-item">
                        <Link   className="nav-link" 
                                style={isActive(this.props.history, '/shop')}  
                                to="/shop">
                                    <p>shop</p>
                        </Link>
                    </div>

                    {/* Contact Page */}
                    <div className="nav-item">
                        <Link   className="nav-link" 
                                style={isActive(this.props.history, '/contact')}  
                                to="/contact">
                                    <p>contact</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Nav)




