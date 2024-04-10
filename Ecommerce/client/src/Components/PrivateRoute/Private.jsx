import axios from "axios";
import { useContext, useEffect, useState } from "react";
import mycontext from "../../Context/myContext";
import { Outlet } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";
// import { baseUrl } from "../../urls.js";
// import { baseUrl } from "../../../urls";

export const Private = () => {
    const contextData = useContext(mycontext);
    const { auth } = contextData;
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try {
                if (auth?.token) {
                    const res = await axios.get('https://e-commerce-rest-api-fcle.onrender.com/api/auth/user-auth', {
                        headers: {
                            "Authorization": auth?.token
                        }
                    });
                    setOk(res.data.ok);
                } else {
                    // If no token is available, consider the user unauthorized
                    setOk(false);
                }
            } catch (error) {
                console.error("Error checking user authorization:", error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth]);

    return ok ? <Outlet /> : <Spinner />;
};
