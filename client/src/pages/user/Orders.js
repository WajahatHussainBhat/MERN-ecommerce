import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import OrdersTable from "../../components/Table/OrdersTable";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();


    //get orders
    const getOrders = async() => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders", {
                headers: {
                    Authorization: auth && auth.token,
                },
            });
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth && auth.token) getOrders();
    }, [auth && auth.token]);

    return ( <
        Layout title = { "Orders" } >
        <
        div className = "user-dashboard" >
        <
        div className = "userMenu" >
        <
        h2 > User Menu < /h2> <UserMenu / >
        <
        /div>{" "} <
        div className = "user-dashboard-details orders" >
        <
        h1 > All Orders < /h1> <OrdersTable orders={orders} / > { " " } <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default Orders;