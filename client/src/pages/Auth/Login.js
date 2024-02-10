import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));

                navigate(location.state || "/home");
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
        h1 > Login < /h1>{" "} <
        form onSubmit = { handleSubmit } >
        <
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
        div >
        <
        button id = "login_btn"
        type = "button"
        className = "register_btn"
        onClick = {
            () => navigate("/forgot-password") } >
        { " " }
        Forgot Password { " " } <
        /button>{" "} <
        button id = "login_btn"
        type = "submit"
        className = "register_btn" > { " " }
        Submit { " " } <
        /button>{" "} <
        /div>{" "} <
        /form>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default Login;