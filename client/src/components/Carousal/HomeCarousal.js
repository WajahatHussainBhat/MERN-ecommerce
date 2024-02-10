import React from "react";
import { Carousel } from "antd";
import Image1 from "../../pictures/pic1.png";
import Image2 from "../../pictures/pic2.png";
import Image3 from "../../pictures/pic3.png";
import Image4 from "../../pictures/pic4.png";
import Image5 from "../../pictures/pic5.png";

const contentStyle = {
    height: "20vw",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
};
const App = () => ( <
    Carousel effect = "fade"
    className = "home-carousal"
    autoplay autoplaySpeed = { 5000 } >
    <
    div >
    <
    img style = { contentStyle }
    src = { Image1 }
    alt = "Image 1" / >
    <
    /div>{" "} <
    div >
    <
    img style = { contentStyle }
    src = { Image2 }
    alt = "Image 1" / >
    <
    /div>{" "} <
    div >
    <
    img style = { contentStyle }
    src = { Image3 }
    alt = "Image 1" / >
    <
    /div>{" "} <
    div >
    <
    img style = { contentStyle }
    src = { Image4 }
    alt = "Image 1" / >
    <
    /div>{" "} <
    div >
    <
    img style = { contentStyle }
    src = { Image5 }
    alt = "Image 1" / >
    <
    /div>{" "} <
    /Carousel>
);
export default App;