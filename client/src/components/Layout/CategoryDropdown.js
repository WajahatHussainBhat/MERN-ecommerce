import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const CategoryDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const categories = useCategory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const smallerArrowStyle = {
        marginLeft: "0.2vw",
        fontSize: "0.4em",
        verticalAlign: "middle",
    };

    const menuItemStyle = {
        color: "#0092de",
    };

    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return ( <
        div className = "nav_list"
        style = {
            { marginTop: "0.2vw" } } >
        <
        NavLink onClick = { handleClick } > { " " } <
        span >
        Categories < span style = { smallerArrowStyle } > ▼ < /span>{" "} <
        /span>{" "} <
        /NavLink>{" "} <
        Menu anchorEl = { anchorEl }
        open = { open }
        onClose = { handleClose } > { " " } <
        MenuItem component = { Link }
        to = "/categories"
        style = { menuItemStyle } >
        All Categories { " " } <
        /MenuItem>{" "} {
            categories.map((category) => ( <
                MenuItem component = { Link }
                to = { `/category/${category.slug}` }
                key = { category._id }
                onClick = { handleClose }
                style = { menuItemStyle } >
                { " " } { formatName(category.name) } { " " } <
                /MenuItem>
            ))
        } { " " } <
        /Menu>{" "} <
        /div>
    );
};

export default CategoryDropdown;