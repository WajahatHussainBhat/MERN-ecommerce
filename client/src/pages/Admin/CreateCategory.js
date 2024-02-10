import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CustomizedTables from "../../components/Table/CustomizedTable";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../context/auth";


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [auth, setAuth] = useAuth();


    //handle form
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "/api/v1/category/create-category", { name }, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            if (res.data && res.data.success) {
                toast.success(`${name} created successfully`);
                getAllCategories();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };

    //get All categories
    const getAllCategories = async() => {
        try {
            const res = await axios.get("/api/v1/category/get-category");
            if (res.data && res.data.success) {
                setCategories(res.data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

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
        h1 > Manage Category < /h1>{" "} <
        div >
        <
        CategoryForm handleSubmit = { handleSubmit }
        value = { name }
        setValue = { setName }
        />{" "} < /
        div > { " " } <
        div >
        <
        CustomizedTables categories = { categories }
        getAllCategories = { getAllCategories }
        updatedName = { name }
        setUpdatedName = { setName }
        />{" "} < /
        div > { " " } <
        /div>{" "} < /
        div > { " " } <
        /Layout>
    );
};

export default CreateCategory;