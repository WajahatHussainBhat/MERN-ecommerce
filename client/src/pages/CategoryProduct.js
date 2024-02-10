import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import AllProductsCard from "../components/Card/AllProductsCard";

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params && params.slug) getProductsByCat();
    }, [params]);
    //get product by category
    const getProductsByCat = async() => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data && data.products);
            setCategory(data && data.category);
        } catch (error) {
            console.log(error);
        }
    };

    return ( <
        Layout >
        <
        div className = "category-products" >
        <
        h1 className = "category-products-title" > Category - { category && category.name } < /h1> <
        h6 className = "category-products-results" > { products && products.length } { " " }
        results found < /h6> <
        div className = "all-products-list" >
        <
        AllProductsCard products = { products }
        />{" "} <
        /div>{" "} <
        /div> <
        /Layout>
    );
};

export default CategoryProduct;