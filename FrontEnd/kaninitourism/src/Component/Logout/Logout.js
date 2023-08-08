import React,{ useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    navigate('/agent-login')},[navigate])
    return (
        <div>

        </div>
    )
}

export default Logout