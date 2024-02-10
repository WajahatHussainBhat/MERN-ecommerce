import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                newPassword,
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
        Layout title = { 'Forgot-password' } >
        <
        div className = "register " >
        <
        h1 > Reset Password < /h1>{" "} <
        form onSubmit = { handleSubmit } >
        <
        div className = "register_field" >
        <
        input type = "email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        className = "register_field_form"
        placeholder = "Enter your email"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "text"
        value = { answer }
        onChange = {
            (e) => setAnswer(e.target.value)
        }
        className = "register_field_form"
        placeholder = "Enter your Favourite sport?"
        required /
        >
        <
        /div>{" "} <
        div className = "register_field" >
        <
        input type = "password"
        value = { newPassword }
        onChange = {
            (e) => setNewPassword(e.target.value)
        }
        className = "register_field_form"
        placeholder = "Enter your password"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        button id = "login_btn"
        type = "submit"
        className = "register_btn" > { " " }
        Reset { " " } <
        /button>{" "} < /
        div >

        <
        /form>{" "} < /
        div > { " " } <
        /Layout>
    )
}

export default ForgotPassword