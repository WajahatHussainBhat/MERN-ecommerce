import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return ( <
        div className = "footer" >
        <
        h1 >
        All Rights Reserved < span > © < /span> Wajahat Hussain.{" "} <
        /h1>{" "} <
        ul className = "footer_ul" >
        <
        li className = "footer_li" >
        <
        NavLink to = "/about" > About < /NavLink>{" "} <
        /li>{" "} <
        li className = "footer_li" >
        <
        NavLink to = "/contact" > Contact < /NavLink>{" "} <
        /li>{" "} <
        li className = "footer_li" >
        <
        NavLink to = "/policy" > Privacy policy < /NavLink>{" "} <
        /li> <
        /ul> <
        /div>
    );
};

export default Footer;