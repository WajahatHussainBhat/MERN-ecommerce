import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return ( <
        Layout title = { "Dashboard" } >
        <
        div className = "admin-dashboard" >
        <
        div className = "admin-dashboard-list" >
        <
        h2 > Admin Panel < /h2> <AdminMenu / >
        <
        /div>{" "} <
        div className = "admin-dashboard-details" >
        <
        div className = "card" >
        <
        h3 > Admin Name: { auth && auth.user.name } < /h3>{" "} <
        h3 > Admin Email: { auth && auth.user.email } < /h3>{" "} <
        h3 > Admin Conatct: { auth && auth.user.phone } < /h3>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /Layout>
    );
};

export default AdminDashboard;