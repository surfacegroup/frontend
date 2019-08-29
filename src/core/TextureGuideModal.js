import React from 'react'
import Modal from 'react-bootstrap/Modal'

const TextureGuideModal = (props) => (
    <Modal
                                show={props.showTGuide}
                                onHide={() => props.setShowTGuide(false)}
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
                                                        <div className="text-center mb-4"><u>TEXTURE VARIATION</u></div>
                                                        <div className="text-center">T1 - smooth</div>
                                                        <div className="text-center">T2 - light texture</div>
                                                        <div className="text-center">T3 - medium texture</div>
                                                        <div className="text-center">T4 - heavy texture</div>
                                                        </div>
                                                        
                                </Modal.Body>
                            </Modal>
)

export default TextureGuideModal