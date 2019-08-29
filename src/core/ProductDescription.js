import React from 'react'
import Collapsible from 'react-collapsible';

const ProductDescription = (props) => (
    <Collapsible trigger="Description"
                                triggerStyle={{ 
                                fontSize: '25px', 
                                display: 'flex', 
                                justifyContent: 'center',
                                cursor: 'pointer', 
                                borderBottom: '2px solid #5c5c5e',
                                borderTop: '2px solid #5c5c5e',
                                borderLeft: 'none',
                                borderRight: 'none',
                                color: '#5c5c5e',
                                }}
                                transitionTime={100}
                                open={true}>
                        <div className="mb-4" 
                            style={{border: '2px solid #5c5c5e', 
                                    borderTop: 'none'}}>
                            <div className="mb-4 text-muted" 
                                style={{paddingTop: '20px', padding: '30px'}}>
                                {props.product.description}
                            </div>
                        </div>
                    </Collapsible>
)

export default ProductDescription