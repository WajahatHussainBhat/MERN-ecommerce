import Layout from "./../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
        const params = useParams();
        const [product, setProduct] = useState({});
        const [relatedProducts, setRelatedProducts] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            if (params && params.slug) getProduct();
        }, [params.slug]);

        //get the product
        const getProduct = async() => {
            try {
                const { data } = await axios.get(
                    `/api/v1/product/get-product/${params.slug}`
                );
                setProduct(data && data.product);
                getSimilarProducts(
                    data && data.product._id,
                    data && data.product.category._id
                );
            } catch (error) {
                console.log(error);
            }
        };

        //get similar products
        const getSimilarProducts = async(pid, cid) => {
            try {
                const { data } = await axios.get(
                    `/api/v1/product/related-product/${pid}/${cid}`
                );

                setRelatedProducts(data && data.products);
            } catch (error) {
                console.log(error);
            }
        };

        return ( <
            Layout >
            <
            div className = "product-details" >
            <
            h1 className = "product-details-title" > Product Details < /h1>{" "} <
            div className = "product-details-info" >
            <
            div className = "product-details-info-desc" >
            <
            div className = "product-details-img" >
            <
            img height = "400"
            src = { `/api/v1/product/get-product-photo/${product._id}` }
            alt = { product.name }
            />{" "} <
            /div>{" "} <
            div className = "product-details-info-detail" >
            <
            h4 > Name: { product.name } < /h4>{" "} <
            h4 > Description: { product.description } < /h4>{" "} <
            h4 > Price: { product.price } < /h4>{" "} <
            h4 > { " " }
            Category: {
                product &&
                product.category &&
                product.category.name
            } { " " } <
            /h4>{" "} <
            button className = "card-btn" > Add To Cart < /button>{" "} <
            /div>{" "} <
            /div>{" "} <
            div className = "similar-products" >
            <
            h1 className = "similar-products-title" > Similar Products < /h1>{" "} {
                relatedProducts.length < 1 && < p > No Similar Products Found < /p>}{" "} <
                    div className = "product-cards" > { " " } {
                        relatedProducts.map((p) => ( <
                            div className = "similar-cards-list" >
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
                            button className = "card-btn card-btn-details card-btn-productDetails"
                            onClick = {
                                () => navigate(`/product/${p.slug}`) } >
                            { " " }
                            See Details { " " } <
                            /button>{" "} <
                            button className = "card-btn" > { " " }
                            Add To Cart { " " } <
                            /button>{" "} <
                            /div>{" "} <
                            /CardContent>{" "} <
                            /CardActionArea>{" "} <
                            /Card>{" "} <
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

        export default ProductDetails;