import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const {name, email, password, error, success} = values

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password}).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signUpForm = () => (
        <form className="text-center">
            <div className="form-group">
                <label  className="text-muted">Name</label>
                <input  onChange={handleChange('name')} 
                        type="text" 
                        className="form-control"
                        value={name}/>
            </div>
            <div className="form-group">
                <label  className="text-muted">Email</label>
                <input  onChange={handleChange('email')} 
                        type="email" 
                        className="form-control"
                        value={email}/>
            </div>
            <div className="form-group">
                <label  className="text-muted">Password</label>
                <input  onChange={handleChange('password')} 
                        type="password" 
                        className="form-control"
                        value={password}/>
            </div>
            <div className="addtocart">
            <button onClick={clickSubmit} 
                    >Submit
            </button>
            </div>
        </form>
    )

    const showError = () => (
        <div    className="alert alert-danger" 
                style={{display: error ? '': 'none'}}>{error}
        </div>
    )
    
    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '': 'none'}}>Signup Successful! Please <Link to="/signin">Signin!</Link></div>
    )

    return (
        <React.Fragment>
           
            <div className="container col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </div>
            <div    className="text-center mb-4" 
                    style={{marginTop: '20px'}}>
                
            </div>
        </React.Fragment>
    )
}

export default Signup