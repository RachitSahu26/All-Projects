import axios from "axios";
import { useContext, useEffect, useState } from "react";
import mycontext from "../../Context/myContext";
import { Outlet } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";

export const AdminPrivate = () => {
    const { auth,baseUrl} = useContext(mycontext);
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authCheck = async () => {
            try {
                if (auth?.token) {
                    const res = await axios.get(`${baseUrl}/api/auth/admin-auth`, {
                        headers: {
                            "Authorization": auth?.token
                        }
                    });
                    setAuthorized(res.data.ok);
                } else {
                    // If no token is available, consider the user unauthorized
                    setAuthorized(false);
                }
            } catch (error) {
                console.error("Error checking admin authorization:", error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        authCheck();
    }, [auth]);

    if (loading) {
        // Render loading spinner while checking authorization
        return <Spinner />;
    }

    // Render outlet if user is authorized, otherwise show unauthorized message
    return authorized ? <Outlet /> : <div>Unauthorized access</div>;
};
