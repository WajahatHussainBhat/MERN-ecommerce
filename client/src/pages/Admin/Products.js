import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import AllProductsCard from "../../components/Card/AdminAllProductsCard";

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async() => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return ( <
        Layout title = { "Dashboard" } >
        <
        div className = "admin-dashboard" >
        <
        div className = "admin-dashboard-list" >
        <
        h2 > Admin Panel < /h2> <AdminMenu / >
        <
        /div>{" "} <
        div className = "all-products" >
        <
        h1 > All products < /h1>{" "} <
        div className = "all-products-list" >
        <
        AllProductsCard products = { products }
        />{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default Products;