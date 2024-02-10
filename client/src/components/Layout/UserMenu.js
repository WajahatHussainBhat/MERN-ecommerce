import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from "react-router-dom";

export default function UserMenu() {
    return ( <
        Box sx = {
            { width: "100%", maxWidth: 360, bgcolor: "background.paper" } } >
        <
        nav >
        <
        List >
        <
        Divider / >
        <
        ListItem disablePadding >
        <
        NavLink to = "/dashboard/user/profile"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        PersonIcon / >
        <
        /ListItemIcon>{" "} <
        ListItemText primary = "Profile" / >
        <
        /ListItemButton>{" "} <
        /NavLink>{" "} <
        /ListItem>{" "} <
        ListItem disablePadding >
        <
        NavLink to = "/dashboard/user/orders"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        LocalGroceryStoreIcon / >
        <
        /ListItemIcon>{" "} <
        ListItemText primary = "Orders" / >
        <
        /ListItemButton>{" "} <
        /NavLink>{" "} <
        /ListItem>{" "} <
        /List>{" "} <
        /nav>{" "} <
        /Box>
    );
}