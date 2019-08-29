import React from 'react'
import Modal from 'react-bootstrap/Modal'

const ColorGuideModal = (props) => (
    <Modal
                                show={props.showCGuide}
                                onHide={() => props.setShowCGuide(false)}
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
                                                        <div className="text-center mb-4"><u>COLOR VARIATION</u></div>
                                                        <div className="text-center">V1 - no variation</div>
                                                        <div className="text-center">V2 - slight variation</div>
                                                        <div className="text-center">V3 - medium variation</div>
                                                        <div className="text-center">V4 - heavy variation</div>
                                                        <div className="text-center">V5 - extreme variation</div>
                                                        </div>



                                                        
                                </Modal.Body>
                            </Modal>
)

export default ColorGuideModal