import React from 'react'
import Modal from 'react-bootstrap/Modal'


const Calc = (props) => (

    <span className="calc mb-2">
    <a onClick={() => props.setShow(true)}>
    <span style={{fontSize: '15px'}}>
        <span>need help? </span>
            <i className="fas fa-calculator">
            </i>
            <span> try our tile calculator</span>
            </span> 
    
    
    </a>
    
    <Modal
    show={props.show}
    id="review"
    onHide={() => props.setShow(false)}
    dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title"
    centered>
    
    <Modal.Header   style={{ color: 'gray', margin: "0 auto", 
            width: '100%'  }} 
    bsPrefix="card-header text-center">
    <Modal.Title id="example-custom-modal-styling-title">
    <span>how many boxes do i need?</span>
    </Modal.Title>
    </Modal.Header>
    
    <Modal.Body    style={{ display: 'flex', 
            justifyContent: 'center', 
            flexDirection: 'column', 
            textAlign:  'center' }}>
    
    <div    className="row" 
    style={{display: 'flex', 
        justifyContent: 'center', 
        padding: '20px'}}>
    <h4 className="text-muted">I know the sq. ft. area I want to tile. <br/> <br/>  calculate the number of tiles I need to order:</h4>
    </div>    
    
    <form className="mb-3" 
    onSubmit={props.handleSubmit}>
    <div className="form-group">
    <label className="text-muted">Sq. ft.</label>
    <input type="text"
        required
        className="form-control"
        style={{margin: 'auto', width: '40%'}}
        onChange={props.handleChange}
        type="number"/>
    </div>
    <div className="text-center mb-2 mt-2">
    <button className="btn btn-secondary">Calculate <i className="fas fa-calculator"></i></button>
    </div>
    </form>
    
    </Modal.Body>
    </Modal>
    </span>
        )

export default Calc