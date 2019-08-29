import React, { useState, useEffect } from 'react'
import {getCategories, list} from './apiCore'
import SearchResult from './SearchResult'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false,
        itemIndex: 1
    })

    const { categories, 
            category, 
            search, 
            results, 
            searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }

    const searchData = () => {
        if(search) {
            list({search: search || undefined, category: category})
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    setData({...data, results: response, searched: true})
                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handleChange = SGname => event => {
        setData({...data, [SGname]: event.target.value, searched: false})
        if(event.target.value.length < 1) {
            setData({results: []})
        }
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length === 1) {
            return `Found ${results.length} product`
        }

        if(searched && results.length > 0) {
            return `Found ${results.length} products`
        }

        if(searched && results.length < 1) {
            return <div className="container-fluid" style={{backgroundColor: 'white', height: '90px', minWidth: '100%'}}>No Products Found</div>
        } 
    }

    const searchedProducts = (results = []) => {
        return (
            <div className="">
                <h2 className=" text-center">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    <div className="mb-4 col-md-12 search-results-container">
                        {results.map((product, i) => (
                            <SearchResult key={i} 
                                            product={product} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <div className={`form-container ${!searched ? 'no-results' : null}`}>
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg" >
                        <input  type="search"
                                
                                className="form-control" 
                                onChange={handleChange("search")}/>
                    </div>
                <div    className="btn input-group-append" 
                        style={{border: 'none'}}>
                    <button className="input-group-text" 
                            style={{border: 'none'}}>
                                <i style={{fontSize: '23px'}} 
                                    className="fa fa-search">
                                </i>
                    </button>
                </div>
                </span>
            </form>
        </div>
    )
    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <div className="row">
            <div className="container mb-4" 
                style={{minWidth: '100%'}}>
                    {searchForm()}
            </div>
            <div className="container-fluid mb-4">
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search