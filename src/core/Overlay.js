import React from 'react'
import '../App.css'
import '../Responsive.css'

const Overlay = (props) => (
    <div className={`backdrop ${props.show ? 'open-backdrop' : null}`} 
        style={!props.show ? {height: '0', width: '0'} : null} 
        onClick={props.hamburgerClicked}/>
) 

export default Overlay