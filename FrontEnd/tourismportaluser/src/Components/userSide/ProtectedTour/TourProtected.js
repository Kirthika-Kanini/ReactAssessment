import { Navigate } from "react-router-dom";

function TourProtected({token,children})
{
    token=localStorage.getItem("token");
    
    if(token!=null)
        return children;
    return <Navigate to='/home'/>
}

export default TourProtected;