import React from 'react'
import DisplayReviews from './DisplayReviews'
import Review from '../user/Review'
import Collapsible from 'react-collapsible';

const ReviewsSection = (props) => (
    <Collapsible trigger="Reviews"
                                triggerStyle={{ 
                                                fontSize: '25px', 
                                                display: 'flex', 
                                                justifyContent: 'center',
                                                // marginTop: '20px', 
                                                borderBottom: '2px solid #5c5c5e',
                                                cursor: 'pointer',
                                                // borderTop: '2px solid black',
                                                color: '#5c5c5e'}}
                                transitionTime={100}
                                open={true}>
                        <div className="mb-4" 
                            style={{border: '2px solid #5c5c5e', 
                                    borderTop: 'none'}}>
                            <div className="mb-4"  id="reviews" 
                                style={{paddingTop: '20px'}}>
                                <DisplayReviews reviews={props.reviews}
                                                destroy={props.destroy} 
                                                loadReviews={props.loadReviews}
                                                calculateAvgRating={props.calculateAvgRating} 
                                                productId={props.productId}
                                                user={props.user}
                                                token={props.token}/>
                            </div>
                            <div className="mb-4" 
                                    style={{paddingTop: '20px'}}>
                                <Review productId={props.productId}
                                        loadReviews={props.loadReviews}/>
                            </div>
                        </div>
                    </Collapsible>
)

export default ReviewsSection