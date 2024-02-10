import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async() => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line
    }, []);

    //get All categories
    const getAllCategories = async() => {
        try {
            const res = await axios.get("/api/v1/category/get-category");
            if (res.data && res.data.success) {
                setCategories(res.data && res.data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };
    useEffect(() => {
        getAllCategories();
    }, []);

    //handle Update Product
    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.put(
                `/api/v1/product/update-product/${id}`,
                productData, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            if (data && data.success) {
                toast.success("Product Updated Successfully");
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

    //handle delete
    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/product/delete-product/${id}`
            );
            toast.success("Product Deleted Succfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return ( <
        Layout title = { "Dashboard - Create product" } >
        <
        div className = "admin-dashboard" >
        <
        div className = "admin-dashboard-list" >
        <
        h2 > Admin Panel < /h2> <AdminMenu / >
        <
        /div>{" "} <
        form >
        <
        h1 > Update product < /h1>{" "} <
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
        }
        value = { category } >
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
        label className = "photo-upload-button" > { " " } { photo && photo.name ? photo.name : "Upload Photo" } { " " } <
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
            photo ? ( <
                div >
                <
                img src = { URL.createObjectURL(photo) }
                alt = "Product_photo"
                width = { "250vw" }
                className = "upload-photo-preview-img" /
                >
                <
                /div>
            ) : ( <
                div >
                <
                img src = { `/api/v1/product/get-product-photo/${id}` }
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
        }
        value = { shipping ? "Yes" : "No" } >
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
        onClick = { handleUpdate } > { " " }
        Update Product { " " } <
        /button>{" "} <
        button className = "delete-product-btn"
        onClick = { handleDelete } > { " " }
        Delete Product { " " } <
        /button>{" "} <
        /div>{" "} <
        /form>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default UpdateProduct;