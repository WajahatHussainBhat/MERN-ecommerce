import React from "react";
import Layout from "../components/Layout/Layout";
import contactImg from "../images/contact.jpg";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const Contact = () => {
    return ( <
        Layout title = { "Contact Us" } >
        <
        div className = " contact" >
        <
        div className = "contact_img" >
        <
        img src = { contactImg }
        alt = "contactImg"
        id = "contact_Img_only" / >
        <
        /div>{" "} <
        div className = "contact_info" >
        <
        div className = "contact_name" > Contact Us < /div>{" "} <
        p className = "contact_para" >
        for any query and info about product feel free to call anytime. { " " } <
        /p>{" "} <
        div className = "contact_desc" >
        <
        div className = "contact_details" >
        <
        EmailIcon / > < span >: www.help @shopUp.com < /span>{" "} <
        /div>{" "} <
        div className = "contact_details" >
        <
        PhoneIcon / > < span >: 012 - 3456789 < /span>{" "} <
        /div>{" "} <
        div className = "contact_details" >
        <
        HeadsetMicIcon / >
        <
        span >: 1800 - 0000 - 0000(toll - free) < /span>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default Contact;