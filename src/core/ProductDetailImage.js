import React from 'react'
import Magnifier from "react-magnifier";
import {API} from '../config'
import ShowImage from './ShowImage'
import Modal from 'react-bootstrap/Modal'
import { Lightbox } from "react-modal-image";
import Pinterest from 'react-sharingbuttons/dist/buttons/Pinterest'
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook'
import 'react-sharingbuttons/dist/main.css'


const ProductDetailImage = (props) => (
    <React.Fragment>
      {
    props.showImageModal && (
    <Lightbox
      medium={`${API}/product/picture/${props.product._id}`}
      large={`${API}/product/picture/${props.product._id}`}
      alt={props.product.SGname}
      onClose={() => {props.setShowImageModal(false)}}
    />
  )
}    

 <div  className="social-share-container" style={{position: 'relative'}}>
 <Magnifier src={`${API}/product/picture/${props.product._id}`} 
                                    width={'100%'}  
                                    onClick={() => props.setShowImageModal(true)} />

<span className="social-share" style={{position: 'absolute', bottom: '0', left: '0'}}><Pinterest mediaSrc={`http://167.71.255.238/api/product/picture/${props.product._id}`} />
                                            <Facebook url={`http://167.71.255.238/api/product/picture/${props.product._id}`} />
                                            </span>
</div>
       

                                
                                
    </React.Fragment>
)

export default ProductDetailImage