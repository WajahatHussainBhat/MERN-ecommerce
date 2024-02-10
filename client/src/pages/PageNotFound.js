import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
    return (<
        Layout title={'404 - Not Found'} >
        <
        div className="home pnf" >
            <
        h1 className="pnf_title" > 404 < /h1> <
        h2 className="pnf_heading" >
                    Oops < span > ! < /span> Page Not Found. < /
        h2 >

                        <
        NavLink to="/"
                            className="pnf_btn" >
                            Go Back <
        /NavLink> < /
        div > <
        /Layout>
                            );
};

                            export default PageNotFound;