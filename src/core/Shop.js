import React, { useState, useEffect } from 'react'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    })
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(20)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setLoading(false)
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} 
                        className="btn text-center btn-warning mb-5">Load More
                </button>
            )
        )
    }

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if (filterBy == "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            } 
        }
        return array;
    }

    const returnResults = () => {
        if(loading) {
            return (<h1>Loading...</h1>)
        } else {
            return (
                <div className="card-container-shop">
                            {filteredResults.map((product, i) => (
                                        <Card key={i} product={product} />
                                ))} 
                        </div>
            )
        }
        
    }
    
    useEffect(() => {
        loadFilteredResults(skip, limit, myFilters.filters)
        init()
    }, [])

    return (
        <div className="container-fluid">
             <div className="row filter-productgrid">
                <div    className="col-3 filter" 
                        >
                    <div className="filter-group">
                    <h4 className="text-center">Categories</h4>
                    <hr align="center" 
                        width="50%" 
                        style={{backgroundColor: '#5b5b5b'}}/>
                    <ul className="list-group" 
                        style={{paddingLeft: '30px'}}>
                    <Checkbox   handleFilters={filters => handleFilters(filters, 'category')}
                                categories={categories}/>
                    </ul>
                    </div>
                    
                    <br/>

                    <div className="filter-group">
                    <h4 className="text-center">Price Range</h4>
                    <hr align="center" 
                        width="50%" 
                        style={{backgroundColor: '#5b5b5b'}}/>
                    <div    className="list-group" 
                            style={{paddingLeft: '30px'}}>
                        <RadioBox   handleFilters={filters => handleFilters(filters, 'price')} 
                                    prices={prices}/>
                    </div>
                    </div>
                    
                </div>
                <div className="col-9 productgrid">
                    <div style={{marginRight: '15px'}}>
                    {returnResults()}
                    </div>
                    <div className="mt-4 text-center">
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop