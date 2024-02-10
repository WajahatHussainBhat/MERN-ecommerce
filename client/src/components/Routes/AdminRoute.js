import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from 'react-router-dom'
import axios from "axios";
import Spinner from '../../components/Spinner'

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {

        const authCheck = async() => {
            const res = await axios.get('/api/v1/auth/admin-auth', {
                headers: {
                    "Authorization": auth && auth.token //auth ? .token (we can use this also)
                }
            })
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }

        if (auth && auth.token) authCheck();

    }, [auth && auth.token]);

    return ok ? < Outlet / > : < Spinner path = "home" / >


}


export default AdminRoute;