import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const BasicMenu = ({ onLogout }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [auth, setAuth] = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout successfully");

        handleClose(); // Close the menu after logout
    };

    const smallerArrowStyle = {
        marginLeft: "0.2vw",
        fontSize: "0.4em", // You can adjust the font size here
        verticalAlign: "middle", // To vertically align the arrow
    };

    const menuItemStyle = {
        color: "#0092de", // Change this to the color you want
    };

    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return ( <
        div className = "nav_list"
        style = {
            { marginTop: "0.2vw" } } >
        <
        NavLink onClick = { handleClick } > { " " } {
            auth.user && auth.user.name && ( <
                span > { " " } { formatName(auth.user.name) } { " " } <
                span style = { smallerArrowStyle } > ▼ < /span>{" "} <
                /span>
            )
        } { " " } <
        /NavLink>{" "} <
        Menu anchorEl = { anchorEl }
        open = { open }
        onClose = { handleClose } >
        <
        MenuItem component = { Link }
        to = { `/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}` }
        onClick = { handleClose }
        style = { menuItemStyle } >
        Dashboard { " " } <
        /MenuItem>{" "} <
        MenuItem component = { Link }
        to = "/login"
        onClick = { handleLogout }
        style = { menuItemStyle } >
        Logout { " " } <
        /MenuItem>{" "} <
        /Menu>{" "} <
        /div>
    );
};

export default BasicMenu;