import { API } from '../config'

export const read = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getUserWishlist = (userId, token) => {
    return fetch(`${API}/user/wishlist/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const addToWishlist = (userId, token, productId) => {
    return fetch(`${API}/user/updatewishlist/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productId)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const addToAdminSubscribers = (email) => {
    return fetch(`${API}/user/subscribers/update`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({email})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const removeFromWishlist = (productId, userId, token) => {
    return fetch(`${API}/user/updatewishlist/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const postReview = (userId, token, review) => {
    return fetch(`${API}/review/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(review)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteReview = (reviewId, userId, token) => {
    return fetch(`${API}/review/${reviewId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}