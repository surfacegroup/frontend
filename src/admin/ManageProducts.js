import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {getProducts, deleteProduct} from './apiAdmin'
import ShowImage from '../core/ShowImage'
import Modal from 'react-bootstrap/Modal'

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    const {user, token} = isAuthenticated()
    const [showImageModal, setShowImageModal] = useState(false)


    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
                setShowImageModal(false)
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className="container-fluid text-center">
            <div className="dash-top">
            <i className="fas fa-users-cog"></i>
            <h2 className="ml-4"><em>Manage Products</em></h2>
            </div>
            <h2 className="mt-4 mb-4">Total of {products.length === 1 ? products.length + ' product' : products.length + ' products' }</h2>
            <hr/>
            <div className="card-container-shop">
                
                {products.map((p, i) => (
                        <div    key={i} 
                                className="mb-4">
                                    <Link to={`/admin/product/update/${p._id}`}>
                                    <ShowImage item={p} url="product" key={i}/>
                                    </Link>
                                    
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                                <div><strong className="text-muted">{p.SGname}</strong></div>
                                <div><Link to={`/admin/product/update/${p._id}`}>
                                    <span className="mr-2"><i className="text-secondary fas fa-edit"></i></span>
                                </Link>
                                <span   onClick={() => setShowImageModal(!showImageModal)} 
                                        className="ml-2">
                                    <i className="text-danger fas fa-trash-alt"></i>
                                </span></div>
                                </div>
                                
                                <Modal
                                show={showImageModal}
                                onHide={() => setShowImageModal(false)}
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                                centered
                                size="xl"
                                autoFocus={true}
                                dialogClassName="modal-body"
                                backdropClassName="modal-backdrop">    
                            <Modal.Body style={{display: 'flex', 
                                                    justifyContent: 'center', 
                                                    flexDirection: 'column', 
                                                    textAlign:  'center'}}>
                                                        <div className="mt-2 mb-2">
                                                        <p>Are you sure you want to delete {p.SGname}?</p>
                                                        <em>This action can't be undone..</em>
                                                        <div className="warning-modal" style={{margin: '20px'}}>
                                                            <button onClick={() => destroy(p._id)} className="btn btn-danger">Yes</button>
                                                            <button onClick={() => setShowImageModal(false)}className="btn btn-warning">No</button>
                                                        </div>
                                                        </div>



                                                        
                                </Modal.Body>
                            </Modal>
                        </div>
                ))}
            </div>
        </div>  
    )
}

export default ManageProducts