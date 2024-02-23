import React, { useEffect, useState } from 'react'
import mycontext from './myContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Mystate = (props) => {

  const [categories, setCategories] = useState([]);


  const [allProduct, setAllProduct] = useState([]);

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


  // ...................................get all Product data...........

  const getAllProduct = async () => {

    try {
      const { data } = await axios.get("http://localhost:3000/api/product/get-product");

      setAllProduct(data.products);
    }
       catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  }






  // ...................................get all category data...........

  const getAllCategory = async () => {

    try {
      const { data } = await axios.get("http://localhost:3000/api/category/get-category");

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








  return (
    <mycontext.Provider value={{
      auth, setAuth,
  
      categories, setCategories, getAllCategory,
      getAllProduct,allProduct
    }}>
      {props.children}
    </mycontext.Provider>
  )
}

export default Mystate
