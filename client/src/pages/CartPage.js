import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);

    // Total price calculation
    const totalPrice = () => {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    // Delete cart item
    const removeCartItem = (pid) => {
        const updatedCart = cart.filter((item) => item._id !== pid);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Get payment gateway token
    const getToken = async() => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data.clientToken);
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth.token]);

    // Handle payment
    const handlePayment = async() => {
        if (!instance) {
            console.error("Payment instance is not available.");
            return;
        }

        setLoading(true);

        try {
            const { nonce } = await instance.requestPaymentMethod();
            const response = await axios.post(
                "/api/v1/product/braintree/payment", {
                    nonce,
                    cart,
                }, {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );

            if (response.data) {
                setLoading(false);
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Payment Completed Successfully");
            } else {
                console.error("Payment failed:", response);
                setLoading(false);
                toast.error("Payment failed. Please try again later.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            setLoading(false);
            toast.error("Payment failed. Please try again later.");
        }
    };

    return ( <
        Layout >
        <
        div className = "cartPage" >
        <
        div >
        <
        h1 className = "cartPage-heading" > { `Hello ${auth.user.name || "Guest"}!` } <
        /h1> <
        h4 className = "cartPage-desc" > {
            cart.length > 0 ?
            `You have ${cart.length} items in your cart ${
                  auth.token ? "" : "please log in to checkout"
                }` :
                "Your cart is empty"
        } <
        /h4> <
        /div> <
        div className = "cartPage-contentArea" > { /* Left section - Display cart items */ } <
        div className = "cartPage-contentArea-left" >
        <
        div className = "cartPage-contentArea-left-row" > {
            cart.map((p) => ( <
                div className = "cartPage-contentArea-left-row-eachProduct"
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
                /> <
                /CardActionArea> <
                /Card> <
                /div> <
                div className = "product-cart-details" >
                <
                h3 > { p.name } < /h3> <
                p > { p.description.substring(0, 40) }... < /p> <
                p > Price: { p.price } < /p> <
                button className = "remove-btn"
                onClick = {
                    () => removeCartItem(p._id) } >
                Remove <
                /button> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div>

        { /* Right section - Cart summary and payment */ } <
        div className = "cartPage-contentArea-right" >
        <
        div className = "cartSummary-heading" >
        <
        h1 > Cart Summary < /h1> <
        h5 > Total | Checkout | Payment < /h5> <
        /div> <
        hr / >
        <
        div className = "cartTotal" >
        <
        h3 > Total: { totalPrice() } < /h3> {
            auth.user && auth.user.address ? ( <
                div className = "currentAddress" >
                <
                div className = "currentAddress-details" >
                <
                h4 > Current Address: < /h4> <
                h5 > { auth.user.address } < /h5> <
                /div> <
                button className = "checkout-btn"
                onClick = {
                    () => navigate("/dashboard/user/profile") } >
                Update Address <
                /button> <
                /div>
            ) : ( <
                div > {
                    auth.token ? ( <
                        button className = "checkout-btn"
                        onClick = {
                            () => navigate("/dashboard/user/profile") } >
                        Update Address <
                        /button>
                    ) : ( <
                        button className = "checkout-btn"
                        onClick = {
                            () => navigate("/login", { state: "/cart" }) } >
                        Please log in to checkout <
                        /button>
                    )
                } <
                /div>
            )
        } <
        div > {
            clientToken && cart.length > 0 && ( <
                >
                <
                div className = "payment-method" >
                <
                DropIn options = {
                    {
                        authorization: clientToken,
                        paypal: {
                            flow: "vault",
                        },
                    }
                }
                onInstance = {
                    (instance) => setInstance(instance) }
                /> <
                /div> <
                button className = "checkout-btn"
                onClick = { handlePayment }
                disabled = {!instance || !auth.user.address || loading } >
                { loading ? "Processing..." : "Make Payment" } <
                /button> <
                />
            )
        } <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /Layout>
    );
};

export default CartPage;