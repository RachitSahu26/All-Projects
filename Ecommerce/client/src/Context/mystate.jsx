import React, { useEffect, useState } from 'react'
import mycontext from './myContext'

const Mystate = (props) => {

    const [auth, setAuth] = useState({
        user:null,
        token: ""
    });


    useEffect(() => {
        const data = localStorage.getItem("auth",)
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                token: parseData.token,
                user:parseData.user,
            })


        }
    },[]);



    return (
        <mycontext.Provider value={{ auth, setAuth }}>
            {props.children}
        </mycontext.Provider>
    )
}

export default Mystate
