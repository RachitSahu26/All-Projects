import axios from "axios"
import { useContext, useEffect, useState } from "react"
import mycontext from "../../Context/myContext"
// import { set } from "mongoose"
import { Outlet } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";

export const Private = () => {

    const contextData = useContext(mycontext)
    const { auth, setAuth } = contextData;
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:3000/api/auth/user-auth", {
                headers: {
                    "Authorization": auth?.token
                }
            })
            if (res.data.ok) {

                setOk(true);
            }
            else{
                setOk(false);
            }
        }

        if(auth?.token){
            authCheck();
        }
    }, [auth?.token])


return ok? <Outlet/> : <Spinner/>
}