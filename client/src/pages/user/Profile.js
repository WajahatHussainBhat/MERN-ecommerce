import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Orders = () => {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { name, email, phone, address } = auth && auth.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth.user]);
    // form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                "/api/v1/auth/profile", {
                    name,
                    email,
                    password,
                    phone,
                    address,
                }, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            if (data && data.error) {
                toast.error(data.error);
            } else {
                setAuth({...auth, user: data && data.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return ( <
        Layout title = { "Profile" } >
        <
        div className = "user-dashboard" >
        <
        div className = "userMenu" >
        <
        h2 > User Menu < /h2> <UserMenu / >
        <
        /div>{" "} <
        div className = "user-dashboard-details" >
        <
        div className = "user-profile" >
        <
        h1 > User Profile < /h1>{" "} <
        form >
        <
        div className = "register_field" >
        <
        input type = "text"
        value = { name }
        onChange = {
            (e) => setName(e.target.value) }
        className = "register_field_form"
        placeholder = "Enter your name" /
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
        disabled /
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
        placeholder = "Enter your password" /
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
        placeholder = "Enter your phone number" /
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
        placeholder = "Enter your address" /
        >
        <
        /div>{" "} <
        button type = "submit"
        className = " profile-update-btn"
        onClick = { handleSubmit } >
        { " " }
        Update { " " } <
        /button>{" "} <
        /form>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default Orders;