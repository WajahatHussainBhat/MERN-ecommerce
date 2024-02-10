import React from 'react'
import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

const Users = () => {
    return ( <
        Layout title = { "Dashboard - All Users" } >
        <
        div className = "admin-dashboard" >
        <
        div className = "admin-dashboard-list" >
        <
        h2 > Admin Panel < /h2> <
        AdminMenu / >
        <
        /div>

        <
        div >
        <
        h1 > All Users < /h1> <
        /div> <
        /div> <
        /Layout>
    )
}

export default Users