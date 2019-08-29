import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth' 
import {Link, Redirect} from 'react-router-dom'
import {postReview} from './apiUser'
import Ratings from 'react-ratings-declarative';
 
const Review = (props) => {
    const {token, user} = isAuthenticated()
    const ID = props.productId
    
    const [values, setValues] = useState({
        rating: 4,
        title: ' ',
        content: ' ',
        product: '',
        reviewer: '',
        reviewerName: '',
        error: '',
        loading: false,
        createdReview: '',
        redirectToProfile: false,
    })

    const {rating, 
            title, 
            content, 
            reviewer, 
            product,
            loading, 
            createdReview, 
            redirectToProfile, 
            error} = values

    
    const checkAuth = () => {
        if(!isAuthenticated()) {
            setValues({
                product: '',
                reviewer: ''
            })
        } else {
            setValues({
                product: ID,
                reviewer: user._id,
                reviewerName: user.name,
            })
        }
    }


    
    

    

    const handleChange = rating => event => {
        const value = rating === 'rating' ? event : event.target.value
        setValues({...values, [rating]: value})
       
    }

    
    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        postReview(user._id, token, values)
        .then(data => {
            if(data.error) {
                setValues({
                    error: data.error
                })
            } else {
                setValues({
                    ...values, 
                    error: '',
                    createdReview: data.title,
                    title: '',
                    reviewer: '',
                    reviewerName: '',
                    product: '',
                    content: '',
                    loading: false,
                    rating: 4
                })
                props.loadReviews()
              

            }
        })
        
    }
    

    const newReviewForm = () => (
        <div>
            <h1 className="text-muted">Leave A Review!</h1>
            <form className="mb-3" onSubmit={handleSubmit}>

                        <div className="form-group">
                        <Ratings
                                rating={rating < 1 ? rating === 1 : rating}
                                widgetRatedColors="#bf9936"
                                widgetDimensions="20px"
                                widgetSpacings="2px"
                                changeRating={handleChange("rating")}
                            >
                            <Ratings.Widget widgetHoverColor="#bf9936" />
                            <Ratings.Widget widgetHoverColor="#bf9936" />
                            <Ratings.Widget widgetHoverColor="#bf9936" />
                            <Ratings.Widget widgetHoverColor="#bf9936" />
                            <Ratings.Widget widgetHoverColor="#bf9936" />
                            </Ratings>
                        </div>
                        <div className="form-group ml-5 mr-5">
                            <label className="text-muted">Subject</label>
                            <input type="text" 
                                    className="form-control" 
                                    onChange={handleChange("title")}
                                    value={title}/>
                        </div>
                        <div className="form-group  ml-5 mr-5">
                            <label className="text-muted">Message</label>
                            <textarea className="form-control"
                                        onChange={handleChange("content")}
                                        value={content}/>
                        </div>
                        <button className="btn" style={{backgroundColor: '#bf9936'}}>Submit</button>
                    </form>
        </div>
        
    )

    const signInLink = () => (
         <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <Link to="/signin"><h1>Sign In To Leave A Review</h1></Link>
                    </div>
                </div>
        </div>
    )

    useEffect(() => {
        checkAuth()
    },[])
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    
                    {isAuthenticated() ? newReviewForm() : signInLink()}
                </div>
            </div>
        </div>
    )
}

export default Review