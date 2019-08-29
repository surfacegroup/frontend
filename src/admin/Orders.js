import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth'
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin'
import moment from 'moment'
import ShowImage from '../core/ShowImage'
import Collapsible from 'react-collapsible';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])
    const {user, token} = isAuthenticated()
    
    const loadOrders = () => {
        listOrders(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    const showOrdersLength = () => {
        if(orders.length > 1) {
            return (
                <div>
                    <h1 style={{fontSize:'60px'}} 
                        className="mt-4 text-center">
                            You've Got {orders.length} Orders.
                    </h1>
                </div>
            )
        } else if (orders.length === 1) {
            return (
                <div>
                    <h1 style={{fontSize:'60px'}} 
                        className="mt-4 text-center">
                            You've Got {orders.length} Order.
                    </h1>
                </div>
            )
        } else {
            return <h1 className="text-danger text-center mt-5 mb-5">No Orders</h1>
        }
    }

    const showInput = (key, value) => (
        <div className="text-center">
            <Collapsible    trigger={key}
                            triggerWhenOpen={`⬆ ${key} 👆🏻`}
                            triggerStyle={{ fontWeight: 'bolder', 
                                            fontSize: '25px' }}
                            transitionTime={100}>
                <input  type="text" 
                        value={value} 
                        style={{fontSize: '18px'}} 
                        className="form-control" 
                        readOnly/>
            </Collapsible>
            <hr/>
        </div>
    )

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error) {
                console.log('Status update failed')
            } else {
                loadOrders();
            }
        })
    }

    const showStatus = (o) => (
        <div className="form-group">
            <h3 className="mb-4">Status: 
                <mark className={`${o.status === 'Shipped' ? 'bg-primary' 
                                    : o.status === 'Cancelled' ? 'bg-danger' 
                                    : o.status === 'Not processed' ? 'bg-warning' 
                                    : o.status === 'Processing' ? 'bg-info' 
                                    : o.status === 'Delivered' ? 'bg-success' 
                                    : null}`}>{o.status}
                </mark>
            </h3>
            <select style={{ textAlignLast:'center',
                            paddingRight: '29px' }} 
                    className="form-control" 
                    onChange={(e) => {
                                handleStatusChange(e, o._id)}}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} 
                            value={status}>
                            {status}
                    </option>))}
            </select>
        </div>
    )

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, [])

    return (
    <div className="container-fluid">
        <div className="dash-top">
            <i className="fas fa-users-cog"></i>
            <h2 className="ml-4"><em>Orders</em></h2>
            </div>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="mb-4 mt-4">Below is the order history for this ecommerce platform. If you are seeing this page, you have the capability to update the order status, as well as view the product information in order to prepare invoice.</div>
                {showOrdersLength()}
                {orders.map((o, oIndex) => {
                    return (
                        <div className="mt-5 mb-5 text-center" key={oIndex} style={{border: '5px solid #bf9936', padding: '20px'}}>
                            <h2 className="mb-5">
                                Order ID: <mark style={{backgroundColor: '#bf9936'}}>{o._id}</mark>
                            </h2>
                            <h2 className="mb-5">
                                Ordered by: <u>{o.user.name}</u>
                            </h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">{showStatus(o)}</li>                  
                                <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                <li className="list-group-item ">Amount: <span className="text-success" style={{fontWeight: 'bold'}}>${o.amount}</span></li>
                                <li className="list-group-item">Ordered <strong>{moment(o.createdAt).fromNow()}</strong></li>
                                <li className="list-group-item">Delivery Address: {o.address}</li>
                            </ul>
                            <Collapsible trigger={`This Order Contains ${o.products.length === 1 ? `${o.products.length + ' Item'}` :  `${o.products.length + ' Items'}`}`}
                                        triggerStyle={{fontWeight: 'bolder', 
                                                        fontSize: '25px', 
                                                        display: 'flex', 
                                                        justifyContent: 'center', 
                                                        marginBottom: '50px',
                                                        marginTop: '50px',
                                                        color: 'indigo'}}
                                        triggerWhenOpen="⬆ Hide Items 👆🏻">
                            {o.products.map((p, pIndex) => (
                                <div className="mb-4" key={pIndex} style={{padding: '20px', border: '3px solid black'}}>
                                    <div className="p-image mb-3" style={{width: '30%', margin: '0 auto'}}>
                                    <ShowImage item={p} url="product" onClick={console.log(o)}/>
                                    </div>
                                    <div className="text-center">
                                        <h3>Vendor: <strong>{p.vendor}</strong></h3>
                                        <h3>Our Name: <strong>{p.SGname}</strong></h3>
                                        <h3>Vendors Name: <strong>{p.vendorsName}</strong></h3>
                                    </div>
                                    <Collapsible trigger="⬇ Product Info 👇🏼"
                                                triggerStyle={{fontWeight: 'bolder', 
                                                                fontSize: '40px', 
                                                                display: 'flex', 
                                                                justifyContent: 'center', 
                                                                marginBottom: '50px',
                                                                marginTop: '50px',
                                                                color: 'indigo'}}
                                                triggerWhenOpen="⬆ Hide Info 👆🏻">
                                                 
                                    {showInput('SG Item Code', p.SGItemCode)}
                                    {showInput('Vendor Item Code', p.VendorItemCode)}
                                    {showInput('How Many', p.count)}
                                    {showInput('Series Name', p.seriesName)}
                                    {showInput('Finish', p.finishes)}
                                    {showInput('Category', p.category)}
                                    {showInput('SQ FT Per Box', p.sqFootPerBox)}
                                    {showInput('Vendor Cost Per Piece', p.VendorCostPerPiece)}
                                    {showInput('Vendor Cost Per SF', p.VendorCostPerSF)}
                                    {showInput('Vendor Cost Per Box', p.VendorCostPerBox)}
                                    {showInput('SG Price Per Piece', p.SGPricePerPiece)}
                                    {showInput('SG Price Per SF', p.SGPricePerSF)}
                                    {showInput('SG Price Per Box', p.SGPricePerBox)}
                                    {showInput('Weight', p.weight)}
                                    {showInput('Length', p.length)}
                                    {showInput('Width', p.width)}
                                    {showInput('Thickness', p.thickness)}
                                    {showInput('Product ID', p._id)}
                                    </Collapsible>
                                </div>
                            ))}
                            </Collapsible>            
                        </div>
                    )
                })}
            </div>
        </div>
    </div>)
}

export default Orders