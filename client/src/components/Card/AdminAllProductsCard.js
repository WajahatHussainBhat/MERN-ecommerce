import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const AdminAllProductsCard = ({ products }) => {
    return ( <
        div className = "product-cards" > { " " } {
            products.map((p) => ( <
                Link to = { `/dashboard/admin/update-product/${p.slug}` }
                key = { p._id }
                className = "product-cards-list" >
                <
                Card className = "product-card" >
                <
                CardActionArea >
                <
                CardMedia component = "img"
                height = "140"
                image = { `/api/v1/product/get-product-photo/${p._id}` }
                alt = { p.name }
                />{" "} <
                CardContent className = "card-content" >
                <
                Typography gutterBottom variant = "h5"
                component = "div" > { " " } { p.name } { " " } <
                /Typography>{" "} <
                Typography variant = "body2"
                color = "#7ebada" > { " " } { p.description } { " " } <
                /Typography>{" "} <
                /CardContent>{" "} <
                /CardActionArea>{" "} <
                /Card>{" "} <
                /Link>
            ))
        } { " " } <
        /div>
    );
};

export default AdminAllProductsCard;