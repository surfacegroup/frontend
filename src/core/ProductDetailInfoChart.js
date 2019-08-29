import React from 'react'
import Calc from './Calc'

const ProductDetailInfoChart = (props) => (
    <React.Fragment>
        <div className=" tilesperbox mt-4 border-top border-left border-right border-dark" style={{fontSize: '14px'}}>
                                            <span className="" style={{width: '100%'}}>
                                                <span style={{width: '100%'}}>
                                                <i className="fas fa-square"></i> per <i className="fas fa-cube"></i>
                                                </span>
                                            </span>

                                            <span className="" style={{width: '100%'}}>
                                                <span style={{width: '100%'}}> 
                                                    {/* add tiles per SF */}
                                                    <i className="fas fa-square"></i> per SF
                                                </span>
                                            </span>

                                            <span className="" style={{width: '100%'}}>
                                                <span style={{width: '100%'}}
                                                > <i className="far fa-minus-square"></i> minimum order  
                                                </span>
                                            </span>
                                        </div>


                                        <div className="tilesperbox border border-dark" style={{fontSize: '14px'}}>
                                            <span className="" style={{width: '100%'}}>
                                                <span style={{width: '100%'}}>
                                                    {/* add piece per box */}
                                                    {`${(props.product.SGPricePerBox / props.product.SGPricePerPiece).toFixed()} per box`}
                                                </span>
                                            </span>

                                            <span className="" style={{width: '100%'}}>
                                                <span style={{width: '100%'}}> 
                                                    {/* add tiles per SF */}
                                                   {`${(props.product.SGPricePerPiece / props.product.SGPricePerSF).toFixed()} per SF`}
                                                </span>
                                            </span>

                                            <span className="" style={{width: '100%'}}>
                                                <span style={{width: '100%'}}
                                                >  {`${props.product.minimumOrder} pieces (~ ${props.product.minimumOrder * (props.product.SGPricePerPiece / props.product.SGPricePerSF).toFixed()} SF) `}
                                                </span>
                                            </span>
                                        </div>
                                        
                                        <div style={{cursor: 'pointer'}}>
                                        <span className="border-bottom border-left border-right border-dark calc-container">
                                        {props.product.Quantity > 1  ? <Calc setShow={props.setShow} show={props.show}  handleSubmit={props.handleSubmit} handleChange={props.handleChange}/> : null}
</span>
</div>
    </React.Fragment>
)

export default ProductDetailInfoChart