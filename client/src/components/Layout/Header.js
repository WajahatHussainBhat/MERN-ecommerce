import React from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../context/auth";
import useCategory from "../../hooks/useCategory";
import BasicMenu from "./AdminDropdown";
import SearchInput from "../../components/Form/SearchInput";
import CategoryDropdown from "./CategoryDropdown";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const [cart] = useCart();

    return ( <
        >
        <
        div className = "navbar" >
        <
        div className = "nav_brand" >
        <
        NavLink to = "/home" > { " " } <
        ShoppingCartIcon / > ShopUp { " " } <
        /NavLink>{" "} <
        /div>{" "} <
        div >
        <
        SearchInput / >
        <
        /div>{" "} <
        div className = "nav_content" >
        <
        ul >
        <
        li className = "nav_list" >
        <
        NavLink to = "/home" > Home < /NavLink>{" "} <
        /li>{" "} <
        li className = "nav_list" >
        <
        CategoryDropdown / >
        <
        /li>{" "} {
            !auth.user ? ( <
                >
                <
                li className = "nav_list" >
                <
                NavLink to = "/register" > Register < /NavLink>{" "} <
                /li>{" "} <
                li className = "nav_list" >
                <
                NavLink to = "/login" > Login < /NavLink>{" "} <
                /li>{" "} <
                />
            ) : ( <
                >
                <
                BasicMenu / >
                <
                />
            )
        } { " " } <
        li className = "nav_list cart-badge-list" >
        <
        Badge count = { cart && cart.length } >
        <
        NavLink to = "/cart" > Cart < /NavLink>{" "} <
        /Badge>

        <
        /li>{" "} <
        /ul>{" "} <
        /div>{" "} <
        /div>{" "} <
        />
    );
};

export default Header;