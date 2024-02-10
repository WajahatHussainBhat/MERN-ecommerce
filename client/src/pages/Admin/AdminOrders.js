import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const headerCellStyles = {
        backgroundColor: "white",
        color: "#0482c5",
        fontSize: "0.9vw",
        fontWeight: "bold",
    };

    const tableRowStyles = {
        "&:hover": {
            backgroundColor: "#6ac7f738",
            fontFamily: "M PLUS Rounded 1c",
        },
        "& td": {
            color: "#0482c5",
            fontSize: "0.75vw",
        },
    };

    //get orders
    const getOrders = async() => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-orders", {
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

    //handle Change
    const handleChange = async(orderId, value) => {
        try {
            const { data } = await axios.put(
                `/api/v1/auth/order-status/${orderId}`, { status: value }, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return ( <
        Layout title = { "All Orders Data" } >
        <
        div className = "admin-dashboard" >
        <
        div className = "admin-dashboard-list" >
        <
        h2 > Admin Panel < /h2> <AdminMenu / >
        <
        /div>{" "} <
        div className = "admin-dashboard-details" >
        <
        h1 > All orders < /h1>{" "} <
        div >
        <
        TableContainer className = "ordersTable"
        component = { Paper } >
        <
        Table sx = {
            { minWidth: 650 } } >
        <
        TableHead >
        <
        TableRow >
        <
        TableCell sx = { headerCellStyles } > # < /TableCell>{" "} <
        TableCell sx = { headerCellStyles }
        align = "right" > { " " }
        Status { " " } <
        /TableCell>{" "} <
        TableCell sx = { headerCellStyles }
        align = "right" > { " " }
        Buyer { " " } <
        /TableCell>{" "} <
        TableCell sx = { headerCellStyles }
        align = "right" > { " " }
        Date { " " } <
        /TableCell>{" "} <
        TableCell sx = { headerCellStyles }
        align = "right" > { " " }
        Payment { " " } <
        /TableCell>{" "} <
        TableCell sx = { headerCellStyles }
        align = "right" > { " " }
        Quantity { " " } <
        /TableCell>{" "} <
        /TableRow>{" "} <
        /TableHead>{" "} <
        TableBody > { " " } {
            orders &&
                orders.map((o, i) => ( <
                    TableRow sx = { tableRowStyles } >
                    <
                    TableCell component = "th"
                    scope = "row" > { " " } { i + 1 } { " " } <
                    /TableCell>{" "} <
                    TableCell align = "right" >
                    <
                    Select bordered = { false }
                    onChange = {
                        (value) => handleChange(o._id, value) }
                    defaultValue = { o && o.status } >
                    { " " } {
                        status.map((s, i) => ( <
                            Option key = { i }
                            value = { s } > { " " } { s } { " " } <
                            /Option>
                        ))
                    } { " " } <
                    /Select>{" "} <
                    /TableCell>{" "} <
                    TableCell align = "right" > { " " } { o && o.buyer.name } { " " } <
                    /TableCell>{" "} <
                    TableCell align = "right" > { " " } { moment(o && o.createdAt).fromNow() } { " " } <
                    /TableCell>{" "} <
                    TableCell align = "right" > { " " } { o && o.payment.success ? "Success" : "Failed" } { " " } <
                    /TableCell>{" "} <
                    TableCell align = "right" > { " " } { o && o.products && o.products.length } { " " } <
                    /TableCell>{" "} <
                    /TableRow>
                ))
        } { " " } <
        /TableBody>{" "} <
        /Table>{" "} <
        /TableContainer>{" "} <
        div > { " " } {
            orders &&
                orders.map((o, i) => ( <
                    div > { " " } {
                        o.products &&
                            o.products.map((p, i) => ( <
                                div className = "cartPage-contentArea-left-row-eachProduct orderPage-items"
                                key = { p._id } >
                                <
                                div className = "product-cart-img" >
                                <
                                Card className = "product-card product-cart-imgCard" >
                                <
                                CardActionArea >
                                <
                                CardMedia component = "img"
                                height = "150"
                                image = { `/api/v1/product/get-product-photo/${p._id}` }
                                alt = { p.name }
                                />{" "} <
                                /CardActionArea>{" "} <
                                /Card>{" "} <
                                /div>{" "} <
                                div className = "product-cart-details" >
                                <
                                h3 > { p.name } < /h3>{" "} <
                                p > { p.description.substring(0, 40) }... < /p>{" "} <
                                p > Price: { p.price } < /p>{" "} <
                                /div>{" "} <
                                /div>
                            ))
                    } { " " } <
                    /div>
                ))
        } { " " } <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default AdminOrders;