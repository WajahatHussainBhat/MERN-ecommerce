import Layout from './../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../context/search'
import SearchCard from '../components/Card/SearchCard';

const Search = () => {
    const [values, setValues] = useSearch();
    return ( <
        Layout title = { 'Search Results' } >
        <
        div className = 'search-results' >
        <
        h1 className = 'search-results-title' > Search Results < /h1> <
        h6 className = 'search-results-desc' > { values && values.results.length < 1 ? "No Products Found" : `Found ${values && values.results.length}` } < /h6> <
        div className = "all-products-list search-result-products" >
        <
        SearchCard values = { values }
        />{" "} <
        /div>{" "}       <
        /div> <
        /Layout>
    )
}

export default Search