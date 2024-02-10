import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/cart'
import toast from "react-hot-toast";

const AllProductsCard = ({ products }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return ( <
        div className = "product-cards" > { " " } {
            products.map((p) => ( <
                div className = "product-cards-list" >
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
                color = "#7ebada" > { " " } { p.description.substring(0, 30) }... { " " } <
                /Typography>{" "} <
                Typography variant = "h6" > { `$${p.price}` } < /Typography>{" "} <
                div className = "card-btns" >
                <
                button className = "card-btn card-btn-details"
                onClick = {
                    () => navigate(`/product/${p.slug}`) } >
                { " " }
                See Details { " " } <
                /button>{" "} <
                button className = "card-btn"
                onClick = {
                    () => {
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item added to cart successfully')
                    }
                } > Add To Cart < /button>{" "} <
                /div>{" "} <
                /CardContent>{" "} <
                /CardActionArea>{" "} <
                /Card>{" "} <
                /div>
            ))
        } { " " } <
        /div>
    );
};

export default AllProductsCard;