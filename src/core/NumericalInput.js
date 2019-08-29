import React from 'react'
import NumericInput from 'react-numeric-input';
import '../Responsive.css'
const NumericalInput = (props) => (
    <div style={{display: 'flex', minWidth: '100%', justifyContent: 'center', marginTop: '10px'}}>
           <NumericInput value={props.count} 
                        min={1} 
                        mobile={true}
                        style={{
                            input : {
                                minWidth: '100%'
                                }
                            }}/>
    </div>
)

export default NumericalInput