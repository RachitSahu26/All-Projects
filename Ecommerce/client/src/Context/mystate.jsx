import React, { useEffect, useState } from 'react'
import mycontext from './myContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Mystate = (props) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([])




  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });


  useEffect(() => {
    const data = localStorage.getItem("auth",)
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        token: parseData.token,
        user: parseData.user,
      })


    }
  }, []);

  // ...................................get all category data...........

  const getAllCategory = async () => {
   
    try {
      const { data } = await axios.get("http://localhost:3000/api/category/get-category",);

      if (data?.success) {
        toast.success(`successfully  created`);
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }


    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  }


  const categoryHandle = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/category/create-category",
        {
          name,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };








  return (
    <mycontext.Provider value={{
      auth, setAuth,
      name, setName, categoryHandle,
      categories, setCategories,  getAllCategory
    }}>
      {props.children}
    </mycontext.Provider>
  )
}

export default Mystate
