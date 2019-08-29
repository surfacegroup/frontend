import React, {useState, useEffect} from 'react'
import {getAdminSubscribers} from './apiAdmin'
import {isAuthenticated} from '../auth'

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState([])
    const [error, setError] = useState(false)
    const {user, token} = isAuthenticated()

    const getSubscribers = (userId, token) => {
        getAdminSubscribers(userId, token).then((data, error) => {
            if(error) {
                setError(true)
                console.log('front end api call didnt work')
            } else {
                setSubscribers(data)
            }
        })
    }
    useEffect(() => {
        getSubscribers(user._id, token)
    }, [])
    return (<div onClick={() => {console.log(subscribers)}}>
        <div className="dash-top">
            <i className="fas fa-users-cog"></i>
            <h2 className="ml-4"><em>Email Subscribers</em></h2>
            </div>
        <p className="text-center mb-4 mt-4 ml-5 mr-5">This is a list of people who have subscribed to our emails. Upon somebody emailing us regarding removing them from the list, please remove them from the list. As of right now, no function exists to remove them, so you must do it from the mongodb console. I will make that function asap!</p>
        {subscribers.map(subscriber => {
            return <div className="ml-2">{subscriber}</div>
        })}
    </div>)
}

export default Subscribers