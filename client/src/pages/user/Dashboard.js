import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth"

const Dashboard = () => {
    const [auth] = useAuth();
    return ( <
        Layout title = { "Dashboard" } >

        <
        div className = "user-dashboard" >
        <
        div className = "userMenu" >
        <
        h2 > User Menu < /h2> <
        UserMenu / >
        <
        /div> <
        div className = "user-dashboard-details" >
        <
        div className = "card" >
        <
        h3 > Admin Name: { auth && auth.user.name } < /h3>{" "} <
        h3 > Admin Email: { auth && auth.user.email } < /h3>{" "} <
        h3 > Admin Conatct: { auth && auth.user.phone } < /h3>{" "} <
        /div>{" "} <
        /div> <
        /div>


        <
        /Layout>
    );
};

export default Dashboard;