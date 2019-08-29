import React from 'react'
import Ratings from 'react-ratings-declarative';
import moment from 'moment'
import {isAuthenticated} from '../auth'

class DisplayReviews extends React.Component {
    constructor(props) {
       
        super(props)
        this.state = {
            reviews: this.props.reviews,
            error: false,
            ratings: [],
            userExists: false,
            changed: false,
            loadedState: false
        }
        // this.destroy = this.destroy.bind(this)
        
    }
    
    componentWillReceiveProps() {
        
       
        const {user} = isAuthenticated()
        if (isAuthenticated()) {
            this.setState({
                userId: user._id
            })
        } else {
            this.setState({
                userId: 0
            })
        }
        this.setState({
            reviews: this.props.reviews,
        }, () => {
            let ratings = this.props.reviews.map(rev => rev.rating == null ? rev.rating = 0 : rev.rating);
            
            this.setState({
                ratings: ratings,
                
            }, () => {
                this.props.calculateAvgRating(this.state.ratings)
            })
        })
        
        
    }
    
    
    

    

    

    

    render() {
        return (
            this.props.reviews.map((review, i) => {
                return (
                    <div    className="review-card mr-5 ml-5" 
                            key={i} 
                            style={{maxWidth: '100%', 
                                    margin: '20px'}}>
                                    <div className="review-delete">{review.reviewer === this.state.userId ? <div className="text-danger" style={{cursor: 'pointer'}} onClick={() => {this.props.destroy(review._id, () => {this.props.calculateAvgRating(this.state.ratings)})}}>X</div> : null}</div>

                    <div className="reviewer-date">
                        <div className=" name-rating-date-title">
                        <div className="rating-title text-muted" style={{height: '100%'}}>

                        <strong style={{fontSize: '25px'}}>{review.title == "" ? review.title : `"${review.title}"`}</strong>
                        

                        </div>
                        <div className="rating-title text-muted" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <strong>{review.reviewerName}</strong>
                        <em>{moment(review.createdAt).fromNow()}</em>
                        </div>
                        
                        </div>
                        <div className="review-content">
                        <div className="" >
                        <Ratings
                                    rating={review.rating}
                                    widgetRatedColors="#bf9936"
                                    widgetDimensions="20px"
                                    widgetSpacings="2px"
                                    >
                                        <Ratings.Widget widgetRatedColors="#bf9936" />
                                        <Ratings.Widget widgetRatedColors="#bf9936"/>
                                        <Ratings.Widget widgetRatedColors="#bf9936"/>
                                        <Ratings.Widget widgetRatedColors="#bf9936"/>
                                        <Ratings.Widget widgetRatedColors="#bf9936"/>
                        </Ratings>
                        </div>
                        <div className="text-muted" onClick={() => {
                                        console.log(this.props.user)
                                    }}>
                            <em>{review.title == "" ? review.content : `"${review.content}"`}</em>
                        </div>
                
                        </div>
                    </div>
                        </div>)
            })
        )
    }
}

export default DisplayReviews