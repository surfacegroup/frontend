import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {getBraintreeClientToken, processPayment, createOrder} from './apiCore'
import {emptyCart} from './cartHelpers'
import {isAuthenticated} from '../auth'
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token
    let deliveryAddress = data.address

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error})
            } else {
                setData({ clientToken: data.clientToken })
            }
        })
    }

    const handleAddress = event => {
        setData({...data, address: event.target.value})
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.SGPricePerBox
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div className="">{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign In To Checkout</button>
            </Link>
        )
    }

    const buy = () => {
        setData({ loading: true });
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };
                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };


    const showDropIn = () => (
       
        <div onBlur={() => setData({...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
            <div>
                <div className="form-group mb-3">
                    <label className="text-muted">Delivery Address:</label>
                    <textarea className="form-control"
                                onChange={handleAddress}
                                value={data.address}
                                required
                                placeholder="Type your delivery address here"/>
                </div>
                <DropIn options={{
                    authorization: data.clientToken,
                    paypal: {
                        flow: "vault"
                    }
                }} onInstance={instance => (data.instance = instance)}/>
                
                <button onClick={buy} className="btn btn-success btn-block">Pay</button>
            </div>
            ) : null}
        </div>
       
    )

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = (loading) => (
        loading && (<h2>Loading...</h2>)
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks! Your payment was successful!
        </div>
    )

    useEffect(() => {
        getToken(userId, token)
    }, [])

    return <div>

            <h2>Subtotal: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
            </div>
}
export default Checkout