import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    //get all category
    const getAllCategory = async() => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data && data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create product function
    const handleCreate = async(e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.post(
                "/api/v1/product/create-product",
                productData, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            if (data && data.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            } else {
                console.log("Data error", data.error);
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return ( <
        Layout title = { "Dashboard - Create category" } >
        <
        div className = "admin-dashboard" >
        <
        div className = "admin-dashboard-list" >
        <
        h2 > Admin Panel < /h2> <AdminMenu / >
        <
        /div>{" "} <
        div >
        <
        h1 > Create product < /h1>{" "} <
        div className = "create-product" >
        <
        Select className = "create-product-dropdown form-content"
        bordered = { false }
        placeholder = "Select a category"
        size = "large"
        showSearch onChange = {
            (value) => {
                setCategory(value);
            }
        } >
        { " " } {
            categories &&
                categories.map((c) => ( <
                    Option style = {
                        { color: "#0097e6" } }
                    key = { c._id }
                    value = { c._id } >
                    { " " } { c.name } { " " } <
                    /Option>
                ))
        } { " " } <
        /Select>{" "} <
        /div>{" "} <
        div >
        <
        label className = "photo-upload-button" > { " " } {
            photo && photo.name ?
                photo.name :
                "Upload Photo (size should be less than 1mb)"
        } { " " } <
        input type = "file"
        name = "photo"
        accept = "image/*"
        onChange = {
            (e) => setPhoto(e.target.files[0]) }
        hidden /
        >
        <
        /label>{" "} <
        /div>{" "} <
        div className = "upload-photo-preview" > { " " } {
            photo && ( <
                div >
                <
                img src = { URL.createObjectURL(photo) }
                alt = "Product_photo"
                width = { "250vw" }
                className = "upload-photo-preview-img" /
                >
                <
                /div>
            )
        } { " " } <
        /div>{" "} <
        div className = "form-content" >
        <
        input type = "text"
        placeholder = "Write a name"
        value = { name }
        className = "form-content-input"
        onChange = {
            (e) => setName(e.target.value) }
        />{" "} <
        /div>{" "} <
        div className = "form-content" >
        <
        input type = "text"
        placeholder = "Write a description"
        value = { description }
        className = "form-content-input"
        onChange = {
            (e) => setDescription(e.target.value) }
        />{" "} <
        /div>{" "} <
        div className = "form-content" >
        <
        input type = "number"
        placeholder = "Write a price"
        value = { price }
        className = "form-content-input"
        onChange = {
            (e) => setPrice(e.target.value) }
        />{" "} <
        /div>{" "} <
        div className = "form-content" >
        <
        input type = "number"
        placeholder = "Write a quantity"
        value = { quantity }
        className = "form-content-input"
        onChange = {
            (e) => setQuantity(e.target.value) }
        />{" "} <
        /div>{" "} <
        div className = "form-content" >
        <
        Select className = "create-product-dropdown "
        bordered = { false }
        placeholder = "Select shipping"
        size = "large"
        showSearch onChange = {
            (value) => {
                setShipping(value);
            }
        } >
        <
        Option style = {
            { color: "#0097e6" } }
        value = "0" > { " " }
        No { " " } <
        /Option>{" "} <
        Option style = {
            { color: "#0097e6" } }
        value = "1" > { " " }
        Yes { " " } <
        /Option>{" "} <
        /Select>{" "} <
        /div>{" "} <
        div className = "form-btn" >
        <
        button className = "create-product-btn"
        type = "submit"
        onClick = { handleCreate } >
        { " " }
        Create Product { " " } <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default CreateProduct;