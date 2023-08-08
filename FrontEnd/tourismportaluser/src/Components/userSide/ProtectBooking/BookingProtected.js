import { Navigate } from "react-router-dom";

function BookingProtected({token,children})
{
    token=localStorage.getItem("token");
    
    if(token!=null)
        return children;
    return <Navigate to='/home'/>
}

export default BookingProtected;