import axios from "axios";
import { useContext, useEffect, useState } from "react";
import mycontext from "../../Context/myContext";
import { Outlet } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";

export const Private = () => {
    const contextData = useContext(mycontext);
    const { auth } = contextData;
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try {
                if (auth?.token) {
                    const res = await axios.get("http://localhost:3000/api/auth/user-auth", {
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
