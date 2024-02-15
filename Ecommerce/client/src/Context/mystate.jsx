import React, { useEffect, useState } from 'react'
import mycontext from './myContext'

const Mystate = (props) => {

    const [auth, setAuth] = useState({
        token: "",
    });


    // useEffect(() => {
    //     const data = localStorage.getItem("auth",)
    //     if (data) {
    //         const parseData = JSON.parse(data);
    //         setAuth({
    //             ...auth,
    //             token: parseData.token
    //         })


    //     }
    // },[auth]);



    return (
        <mycontext.Provider value={{ auth, setAuth }}>
            {props.children}
        </mycontext.Provider>
    )
}

export default Mystate
