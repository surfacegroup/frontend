import React, { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'


const Login = () => {
    return (
        <div className="container-fluid">
                    <div className="banner1-signin">
                <div className="signin-header text-center">
                    <h1>Login To Your Account</h1>
                </div>
            </div>
                <div className="row mt-5 login-page-cards" style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className="col-sm-6 pt-4 signin-card" style={{border: '2px solid gray',  maxWidth: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <h2 className="text-muted text-center mb-4">Signin</h2>
                            <Signin />
                    </div>
                    <div className="col-sm-6 pt-4 signup-card" style={{border: '2px solid gray', maxWidth: '40%'}}>
                        <h2 className="text-muted text-center mb-4">Signup</h2>
                        <Signup />
                    </div>
                </div>
        </div>
    )
}


export default Login