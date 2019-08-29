import React from 'react'
import Carousel from './Carousel'

const About = () => {
    return (
        <div    className="container" 
                style={{maxWidth: '100%'}}>
                    
            <div className="row">
            <Carousel />
            </div>
            <div className="row about-container2">
                <div className="about-container2-inner">
                    Our Story
                </div>
            </div>
            <div className="row about-container3">
                <span style={{fontSize: '25px'}}>We're Experts On Natural Stone</span>
                <span>Surface Group has been in the Natural Stone industry since 1992. Our staff has extensive knowledge on a vast array of products and materials. We will help you find the right surface for your home.</span>
            </div>
            <div className="row about-container4"/>
            <div className="row about-container5">
            <span style={{fontSize: '25px'}}>Our Mission</span>
                <div className="about-container5-rect">
                    <span><em>HONESTY FIRST</em></span>
                    <span><em>We are dedicated to making things the right way. How? By investing in our local economies, paying our people fairly and using business as a force for good. We support a culture of transparency in all areas of manufacturing as well as business. It’s how we keep ourselves honest, and why our customers choose us.</em></span>
                </div>
                <div className="about-container5-rect">
                <span><em>HONESTY FIRST</em></span>
                    <span><em>We are dedicated to making things the right way. How? By investing in our local economies, paying our people fairly and using business as a force for good. We support a culture of transparency in all areas of manufacturing as well as business. It’s how we keep ourselves honest, and why our customers choose us.</em></span>
                </div>
                <div className="about-container5-rect">
                <span><em>HONESTY FIRST</em></span>
                    <span><em>We are dedicated to making things the right way. How? By investing in our local economies, paying our people fairly and using business as a force for good. We support a culture of transparency in all areas of manufacturing as well as business. It’s how we keep ourselves honest, and why our customers choose us.</em></span>
                </div>
            </div>
        </div>
    )
}

export default About