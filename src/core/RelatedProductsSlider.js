import React from 'react'
import {read, listRelated} from './apiCore'
import SliderCard from './SliderCard'

class RelatedProductsSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            relatedProducts: [],
            firstItem: {},
            itemIndex: 0
        }
    }

    loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                console.error(data.error)
            } else {
                listRelated(data._id).then(data => {
                    if(data.error) {
                        console.error(data.error)
                    } else {
                        this.setState({
                            relatedProducts: data
                        })
                    }
                })
            }
        })
    }

    prevProperty () {
        var newIndex = this.state.itemIndex--
        this.setState({
            firstItem: this.state.relatedProducts[newIndex]
        })
    }

    nextProperty () {
        var newIndex = this.state.itemIndex++
        this.setState({
            firstItem: this.state.relatedProducts[newIndex]
        })
    }

    render () {
        return (
            <div>
                <h2 className="mb-4 mt-4 text-center" style={{color: '#5C5C5E'}}>Related Products</h2>
                <div className={`best-sellers-home active-slide-${this.state.itemIndex}`}>
                    <div className="best-sellers-container" 
                        style={{'transform': `translate(-${this.state.itemIndex * (100/this.props.relatedProducts.length)}%)`}}>
                            {this.props.relatedProducts.map((product, i) => (
                                <SliderCard key={i} 
                                            product={product} 
                                            id={i}/>
                            ))} 
                    </div>
                </div>
                <div className="slider-btns">
                            <button className="slider-btn"
                                    style={{zIndex: '1000'}}
                                    id="slider-btn-1"
                                    onClick={() => this.prevProperty()}
                                    disabled={this.state.itemIndex === 0}>
                                        <i className="fa fa-arrow-circle-left">
                                        </i>
                            </button>
                            <button className="slider-btn"
                                    style={{zIndex: '1000'}}
                                    id="slider-btn-2"
                                    onClick={() => this.nextProperty()}
                                    disabled={this.state.itemIndex === this.props.relatedProducts.length - 1}>
                                        <i className="fa fa-arrow-circle-right">
                                        </i>
                            </button>
                </div>
            </div>
        )
    }
}

export default RelatedProductsSlider