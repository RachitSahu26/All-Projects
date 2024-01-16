import { Children, useEffect, useState } from "react";
import MyContex from "./Context";
import fetchDataFromApi from "../utils/api";




function MyState(props) {

    const [data, setData] = useState('');



    const UserFetch = async (url) => {

        useEffect(() => {
            try {
                const res =  fetchDataFromApi(url)
                setData(res);


            } catch (error) {
                console.log(error);
            }

        }, [])

    }

  


    return (

        <MyContex.Provider value={{data, setData,UserFetch}}>

            {props.children}



        </MyContex.Provider>

    );



}


export default MyState;