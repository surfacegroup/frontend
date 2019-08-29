import React, {useState, useEffect} from 'react'
import {addToAdminSubscribers} from '../user/apiUser'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Link} from 'react-router-dom'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    let emailinput = document.getElementById("email-input")

    
    const handleChange = (e) => {
        setError('')
        setEmail(e.target.value)
    }
    
    const handleSubmit = (e) => {

        e.preventDefault()
        setError('')
        console.log(email)
        addToAdminSubscribers(email).then(function() {
            NotificationManager.success('Thank you for subscribing!');
            
        }).then(() => {emailinput.value = ""})
        
        
    }

    return (<div id="footer" style={{color: '#5C5C5E'}}>
        <div className="footer-row1">
                    <NotificationContainer/>

            <div className="footer-row1-col1">
                <h2>Follow Us</h2>
                <div className="social-icons">
                    <a href="https://twitter.com/surfacegroup" className="footer-icon">
                    <i className="fab fa-twitter"></i>
                    </a>
                    
                    <a href="https://www.instagram.com/surfacegroup/" className="footer-icon">
                    <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.pinterest.com/surfacegroup/" className="footer-icon">
                    <i className="fab fa-pinterest-p"></i>
                    </a>

                    <a href="https://www.houzz.com/professionals/tile-stone-and-countertops/surface-group-international-pfvwus-pf~1325519544"  className="footer-icon">
                    <i className="fab fa-houzz"></i>
                    </a>
                    
                   <a href="https://www.facebook.com/surfacegroupint/"  className="footer-icon"> <i className="fab fa-facebook-f"></i></a>
                </div>
                
            </div>
            <div className="footer-row1-col2">
                <ul>
                    <li><i className="fas fa-map-marker-alt"></i> 201 S Lageshulte St, Barrington, IL 60010</li>
                    <li><i className="fas fa-phone"></i>  (847) 713-2373</li>
                    <li><i className="fas fa-fax"></i> (847) 713-2370</li>
                    <li><i className="fas fa-envelope"></i> orders@surfacegroup.com</li>
                </ul>
            </div>
            <div className="footer-row1-col3">
                <form onSubmit={handleSubmit}className="" name="name" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Enter Name" >
                    <div>
                    <label>Subscribe to our newsletter!</label>
                <input id="email-input" onChange={handleChange} required type="email"/>
                <button>Submit</button>
                    </div>
               
                
                </form>
            </div>
        </div>
        <div className="footer-row2 text-center">&copy;Surface Group International. All rights reserved. </div>
    </div>)
}

export default Footer