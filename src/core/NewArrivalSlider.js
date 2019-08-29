import React from 'react'
import {getProducts} from './apiCore'
import SliderCard from './SliderCard'

class NewArrivalSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productsByArrival: [],
            firstItem: {},
            itemIndex: 2,
            error: false
        }
    }
    
    componentDidMount() {
        this.loadProductsByArrival()
    }
    
    loadProductsByArrival () {
        getProducts('createdAt').then(data => {
            if(data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    productsByArrival: data,
                    firstItem: data[this.state.itemIndex]
                })
            }
        })
    }

    prevProperty () {
        var newIndex = this.state.itemIndex--
        this.setState({
            firstItem: this.state.productsByArrival[newIndex]
        })
    }

    nextProperty () {
        var newIndex = this.state.itemIndex++
        this.setState({
            firstItem: this.state.productsByArrival[newIndex]
        })
    }

    render () {
        return (
            <div>
                <h2 className="mb-4 mt-4 text-center">New Arrivals</h2>
                <div className={`best-sellers-home active-slide-${this.state.itemIndex}`}>
                    <div    className="best-sellers-container" 
                            style={{'transform': `translate(-${this.state.itemIndex * (100/this.state.productsByArrival.length)}%)`}}>
                                {this.state.productsByArrival.map((product, i) => (
                                <SliderCard key={i} 
                                            product={product} 
                                            id={i}/>))}
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
                                    disabled={this.state.itemIndex === this.state.productsByArrival.length - 1}>
                                        <i className="fa fa-arrow-circle-right">
                                        </i>
                            </button>
                </div>
            </div>
        )
    }
}

export default NewArrivalSlider