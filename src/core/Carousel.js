import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const Carousel = () => {
    const handleOnDragStart = e => e.preventDefault()

return <AliceCarousel mouseDragEnabled
                    autoHeight={true}
                    autoPlay={true}
                    autoPlayInterval={10000}
                    buttonsDisabled
                    dotsDisabled
                    >
                    <div onDragStart={handleOnDragStart} id="carousel-about-1"></div>
                    <div onDragStart={handleOnDragStart} id="carousel-about-2"></div>
                    <div onDragStart={handleOnDragStart} id="carousel-about-3"></div>
                </AliceCarousel>
                


}

export default Carousel