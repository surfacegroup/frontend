import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'
import '../App.css'
import '../Responsive.css'

const isActive = (history, path) => {
        if(history.location.pathname === path) {
            return {color: '#bf9936'}
        } else {
            return {color: 'black'}
        }
    }

class NavSideBar extends React.Component {   
        constructor(props){
                super(props)
        }
        render() {
                return (
                        <div className="nav-box">
                                <nav className={`responsive-nav ${this.props.show ? 'open' : null}`}>
                                <div className="box7"/>
                                <div className="box1">
                                <Link   className="nav-link"
                                        onClick={this.props.show ? 
                                                this.props.hamburgerClicked : 
                                                null}
                                        style={isActive(this.props.history, '/')}  
                                        to="/"><span>home</span>
                                </Link>
                        </div>
                                <div className="box2">
                                <Link   className="nav-link"
                                        onClick={this.props.show ? this.props.hamburgerClicked : null}
                                        style={isActive(this.props.history, '/about')}  
                                        to="/about"><span>about</span>
                                </Link>
                        </div>
                                <div className="box3">
                                <Link   className="nav-link"
                                        onClick={this.props.show ? this.props.hamburgerClicked : null}
                                        style={isActive(this.props.history, '/shop')}  
                                        to="/shop"><span>shop</span>
                                </Link>
                        </div>
                                <div className="box4">
                                <Link   className="nav-link" 
                                        onClick={this.props.show ? this.props.hamburgerClicked : null}
                                        style={isActive(this.props.history, '/contact')}  
                                        to="/contact"><span>contact</span>
                                </Link>
                        </div>
                                <div className="box5">
        
                                {/* Regular User Dashboard Icon */}
                                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                        
                                                <Link   className="nav-link"
                                                        onClick={this.props.show ? 
                                                                this.props.hamburgerClicked : 
                                                                null}
                                                        style={isActive(this.props.history, '/user/dashboard')}  
                                                        to="/user/dashboard">
                                                                <i      className="fas fa-user" 
                                                                        style={{fontSize: '40px',
                                                                                marginTop: '15px'}}>
                                                                </i>
                                                </Link>
                                        
                                )}
        
                                {/* Admin Dashboard Icon */}
                                <div className="resp-nav-dash-signout">
                                        {/* Signout Button */}
                                
                                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                        
                                                <Link   className="nav-link"
                                                        onClick={this.props.show ? this.props.hamburgerClicked : null}
                                                        style={isActive(this.props.history, '/admin/dashboard')}  
                                                        to="/admin/dashboard">
                                                                <i      className="fas fa-user-tie" 
                                                                        style={{fontSize: '40px', 
                                                                                marginTop: '15px'}}>
                                                                </i>
                                                </Link>
                                        
                                )}
                                {isAuthenticated() && (
                                        
                                        <span   className="nav-link mt-2 text-dark" 
                                                style={{cursor: 'pointer',
                                                         border: '2px solid black',
                                                        color: '#ffffff'}} 
                                                onClick={() => signout(() => {
                                                this.props.history.push('/')
                                                
                                                })}
                                                >signout
                                        </span>
                                
                        )}
        
                                
                                </div>
                                
        
                                {/* Signup / Signin */}
                                {!isAuthenticated() && (
                                        <React.Fragment>
                                                
                                                
                                                <Link   className="nav-link mt-5"
                                                        style={{width: '100px'}}
                                                        onClick={this.props.show ? this.props.hamburgerClicked : null}
                                                        style={isActive(this.props.history, '/login')}
                                                        to="/login">Login
                                                </Link>
                                        </React.Fragment>
                                )}
                                
                                {/* Cart */}
                                <Link   className="nav-link"
                                        onClick={this.props.show ? this.props.hamburgerClicked : null}
                                        style={isActive(this.props.history, '/cart')}  
                                        to="/cart">
                                        <div className="cart-icon-count">
                                                <i className="fa fa-shopping-cart"></i>
                                                <p>{itemTotal()}</p>
                                        </div>
                                </Link>
        
                        </div>
                        </nav>
                </div>
                )
        }
       
}

export default withRouter(NavSideBar)