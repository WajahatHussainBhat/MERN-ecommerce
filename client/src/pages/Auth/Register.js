import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return ( <
        Layout title = { "Register - ShopUp" } >
        <
        div className = "register " >
        <
        h1 > Register < /h1>{" "} <
        form onSubmit = { handleSubmit } >
        <
        div className = "register_field" >
        <
        input type = "text"
        value = { name }
        onChange = {
            (e) => setName(e.target.value) }
        className = "register_field_form"
        placeholder = "Enter your name"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        className = "register_field_form"
        placeholder = "Enter your email"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        className = "register_field_form"
        placeholder = "Enter your password"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "text"
        value = { phone }
        onChange = {
            (e) => setPhone(e.target.value) }
        className = "register_field_form"
        placeholder = "Enter your phone number"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "text"
        value = { address }
        onChange = {
            (e) => setAddress(e.target.value) }
        className = "register_field_form"
        placeholder = "Enter your address"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "text"
        value = { answer }
        onChange = {
            (e) => setAnswer(e.target.value) }
        className = "register_field_form"
        placeholder = "What is Your Favourite sports?"
        required /
        >
        <
        /div>{" "} <
        button type = "submit"
        className = "register_btn" > { " " }
        Submit { " " } <
        /button>{" "} <
        /form>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default Register;