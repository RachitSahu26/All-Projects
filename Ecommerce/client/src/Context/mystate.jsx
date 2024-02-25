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

  const [radio, setRadio] = useState([]); // Define radio state here

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

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/product/get-product");
      setAllProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/category/get-category");
      if (data?.success) {
        toast.success(`successfully created`);
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  }

  const filterHandle = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/product/filter-product", {
        category: selectedCategory,
        radio: radio
      });
      console.log("Filtered products:", data);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  return (
    <mycontext.Provider value={{
      auth, setAuth,
      categories, setCategories, getAllCategory,
      getAllProduct, allProduct,
      filterHandle, // Provide filterHandle function
      radio, setRadio // Provide radio state and setter function
    }}>
      {props.children}
    </mycontext.Provider>
  )
}

export default Mystate;
