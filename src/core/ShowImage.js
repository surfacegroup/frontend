import React from 'react'
import {API} from '../config'

const ShowImage = ({item, url}) => (
    <span className="product-img">
        <img    src={`${API}/${url}/picture/${item._id}`} 
                alt={item.name} 
                className="card-img-top" 
                style={{width: '100%', 
                        padding: '0', 
                        margin: '0'}}/>
    </span>
)

export default ShowImage;