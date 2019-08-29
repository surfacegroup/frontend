import React from 'react'
import Search from './Search'
import BestSellerSlider from './BestSellerSlider'
import NewArrivalSlider from './NewArrivalSlider'

const Home = () => { 
    return (
        <div    className="container-fluid home-page" 
                style={{position: 'relative'}}>
            
            {/* Search Bar */}
            <Search  id="search-bar"/>

            {/* Banner 1 */}
            <div className="banner1-home"/>

            {/* Best Seller Slider */}
            <div className="banner2-homebs text-center">
                <BestSellerSlider />
            </div>

            <div className="banner3-home">
                    <h2>Beauty Starts At The Surface</h2>
                    <span>Surface Group takes pride in turning the customer vision into fruition. We never settle for less.</span>
                    <span>We source the highest quality material, and ensure that it's installed with the utmost care.</span>
            </div>

            <div className="banner4-home">
                <div className="banner4-home-left">
                    
                </div>
                <div className="banner4-home-right">
                    <h2>Since 1994...</h2>
                    <span>We have been cultivating our empire since '94. The stone age is now, and we're here to deliver!</span>
                    <span>If you need help, our staff and designers will help you get set up with the right material and installation to make your home the best it can be.</span>
                </div>
            </div>
            
            <div className="banner5-home">
                <div className="banner5-home-top"><h2>Let Our Experts Guide You</h2></div>
                <div className="banner5-home-bottom">
                    <div id="b5-1"></div>
                    <div id="b5-2"></div>
                    <div id="b5-3"></div>
                    <div id="b5-4"></div>
                </div>
            </div>

            

            {/* New Arrival Slider */}
            <div className="banner2-home">
                <NewArrivalSlider />
            </div>
            
            <div className="banner6-home">
                
                <div className="banner6-home-right">
                    <h2>Since 1994...</h2>
                    <span>We have been cultivating our empire since '94. The stone age is now, and we're here to deliver!</span>
                    <span>If you need help, our staff and designers will help you get set up with the right material and installation to make your home the best it can be.</span>
                </div>
                <div className="banner6-home-left"></div>
            </div>

            <div className="banner7-home">
                
            </div>
            
            
        </div>
    )
}

export default Home