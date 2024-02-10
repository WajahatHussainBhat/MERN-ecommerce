import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { NavLink } from "react-router-dom";

export default function BasicList() {
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
        NavLink to = "/dashboard/admin/create-category"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        CreateNewFolderIcon / >
        <
        /ListItemIcon>{" "} <
        ListItemText primary = "Create Category" / >
        <
        /ListItemButton>{" "} <
        /NavLink>{" "} <
        /ListItem>{" "} <
        ListItem disablePadding >
        <
        NavLink to = "/dashboard/admin/create-product"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        AddCircleIcon / >
        <
        /ListItemIcon>{" "} <
        ListItemText primary = "Create Product" / >
        <
        /ListItemButton>{" "} <
        /NavLink>{" "} <
        /ListItem>{" "} <
        ListItem disablePadding >
        <
        NavLink to = "/dashboard/admin/users"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        PeopleIcon / >
        <
        /ListItemIcon>{" "} <
        ListItemText primary = "Users" / >
        <
        /ListItemButton>{" "} <
        /NavLink>{" "} <
        /ListItem>{" "} <
        ListItem disablePadding >
        <
        NavLink to = "/dashboard/admin/products"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        ShoppingCartIcon / >
        <
        /ListItemIcon>{" "} <
        ListItemText primary = "All Products" / >
        <
        /ListItemButton>{" "} <
        /NavLink>{" "} <
        /ListItem>{" "} <
        ListItem disablePadding >
        <
        NavLink to = "/dashboard/admin/orders"
        style = {
            { textDecoration: "none", color: "inherit" } } >
        <
        ListItemButton >
        <
        ListItemIcon >
        <
        LocalShippingIcon / >
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