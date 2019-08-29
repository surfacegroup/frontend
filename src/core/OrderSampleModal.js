import React from 'react'
import Modal from 'react-bootstrap/Modal'

const OrderSampleModal = (props) => (
    <Modal
                                show={props.showSampModal}
                                onHide={() => props.setShowSampModal(false)}
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
                                                        <div className="mt-2 mb-4">
                                                            <h5 className="mb-2">Order A Sample!</h5>
                                                            <br></br>
                                                        <span>Please email us at <em>surfacegroupint@gmail.com</em> with the product name and we will get back to you</span>
                                                        </div>



                                                        
                                </Modal.Body>
                            </Modal>
)

export default OrderSampleModal