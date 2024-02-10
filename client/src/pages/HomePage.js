import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import AllProductsCard from "../components/Card/AllProductsCard";
import { Button, Checkbox, Radio } from "antd";
import Prices from "../components/Prices";
import HomeCarousal from '../components/Carousal/HomeCarousal'

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get All categories
    const getAllCategories = async() => {
        try {
            const res = await axios.get("/api/v1/category/get-category");
            if (res.data && res.data.success) {
                setCategories(res.data.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);

    //get products
    const getAllProducts = async() => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTotal
    const getTotal = async() => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async() => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setProducts([...products, ...data.products]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    //Filter By category
    const handleFilter = async(value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c != id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    // Get filtered products
    const filterProduct = async() => {
        try {
            const { data } = await axios.post(`/api/v1/product/product-filters`, {
                checked,
                radio,
            });
            setProducts(data && data.products);
        } catch (error) {
            console.log(error);
        }
    };

    return ( <
        Layout title = { "All Products - Best offers" } >
        <
        div className = "home" >
        <
        div className = "home-menu" >
        <
        h4 > Filter by category < /h4>{" "} <
        div className = "category-filters" > { " " } {
            categories &&
                categories.map((c) => ( <
                    Checkbox key = { c._id }
                    onChange = {
                        (e) => handleFilter(e.target.checked, c._id) } >
                    { " " } { c.name } { " " } <
                    /Checkbox>
                ))
        } { " " } <
        /div>{" "} { /* Price Filter */ } < h4 > Filter by Price < /h4>{" "} <
        div className = "category-filters" >
        <
        Radio.Group onChange = {
            (e) => setRadio(e.target.value) } > { " " } {
            Prices &&
                Prices.map((p) => ( <
                    div key = { p._id } >
                    <
                    Radio value = { p.array } > { p.name } < /Radio>{" "} <
                    /div>
                ))
        } { " " } <
        /Radio.Group>{" "} <
        /div>{" "} <
        div className = "category-filters" >
        <
        button className = "reset-filter-btn"
        onClick = {
            () => window.location.reload() } >
        { " " }
        Reset filters { " " } <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} <
        div className = "home-content" >
        <
        h1 > All products < /h1>{" "} <
        div >
        <
        HomeCarousal / >
        <
        /div> <
        div className = "all-products-list" >
        <
        AllProductsCard products = { products }
        />{" "} <
        /div>{" "} <
        div > { " " } {
            products && products.length < total ? ( <
                button className = "page-btn"
                onClick = {
                    (e) => {
                        e.preventDefault();
                        setPage(page + 1);
                    }
                } >
                { loading ? "Loading ..." : "Load More" } { " " } <
                /button>
            ) : null
        } { " " } <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default HomePage;