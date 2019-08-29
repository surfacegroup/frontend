import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth'
import {createCategory, deleteCategory} from './apiAdmin'
import {getCategories} from '../core/apiCore'
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {user, token} = isAuthenticated()
    const [showImageModal, setShowImageModal] = useState(false)

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }
    const grabCategories = () => {
        
        getCategories().then(data => {
            if(data.error) {
                setError(true)
            } else {
                setCategories(data)
            }
        })
    }
    const removeCategory = (categoryId, userId, token) => {
        deleteCategory(categoryId, userId, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                grabCategories()
                setShowImageModal(false)
            }
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true)
            } else {
                setError("")
                setSuccess(true)
                grabCategories()
            }
        })
    }

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group text-center">
                <label className="text-muted">Name <em>(ex: wood, tile, stone.. etc.)</em></label>
                <input  type="text" 
                        onChange={handleChange} 
                        className="form-control"
                        value={name}
                        autoFocus
                        required/>
            </div>
            <div className="form-row text-center">
                <div className="col-12 addtocart">
                    <button>submit</button>
                </div>
            </div>
        </form>
    )

    const display = () => (
        <div>
            
            <p className="text-center text-muted mt-4">Below are the existing categories in the database. Clicking on the red <span className="text-danger">X</span> next to the category name will delete the category permanently.</p>

            {categories.map((cat, i) => 
                <div className="mt-4 mb-4" key={i}>
                   
                    <span className="mr-2 text-danger"
                      onClick={() => setShowImageModal(true)}>X
                            
                    </span>
                    <span>
                        {cat.name}
                    </span>
                    <Modal
                                show={showImageModal}
                                onHide={() => setShowImageModal(false)}
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                                centered
                                size="xl"
                                autoFocus={true}
                                
                                backdropClassName="modal-backdrop">    
                            <Modal.Body style={{display: 'flex', 
                                                    justifyContent: 'center', 
                                                    flexDirection: 'column', 
                                                    textAlign:  'center'}}>
                                                        <div className="mt-2 mb-2">
                                                        <p onClick={(e) => {console.log(e)}}>Are you sure you want to delete? {}</p>
                                                        <em>This action can't be undone..</em>
                                                        <div className="warning-modal" style={{margin: '20px'}}>
                                                            <button onClick={() => removeCategory(cat._id, user._id, token)} className="btn btn-danger">Yes</button>
                                                            <button onClick={() => setShowImageModal(false)}className="btn btn-warning">No</button>
                                                        </div>
                                                        </div>



                                                        
                                </Modal.Body>
                            </Modal>
                    
                </div>)}
        </div>
    )

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">{name} was created!</h3>
        }
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Category already exists</h3>
        }
    }
    
    
    const goBack = () => (
        <div className="mt-4 mb-4 text-center">
            <Link to="/admin/dashboard" className="text">Back to Dashboard</Link>
        </div>
    )

    useEffect(() => {
        grabCategories()
    }, [])
    

    return (
        <div className="container-fluid">
            <div className="dash-top">
            <i className="fas fa-users-cog"></i>
            <h2 className="ml-4">
                <em>Manage Categories</em>
            </h2>
            </div>
            <div className="col-md-8 offset-md-2 pl-5 pr-5">
                <h2 className="mt-4 mb-4 text-center">Create a new category</h2>
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {display()}
                {goBack()}
            </div>
        </div>
    )
}

export default AddCategory
