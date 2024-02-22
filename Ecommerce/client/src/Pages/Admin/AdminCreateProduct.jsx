import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Components/Layout/LayOut.jsx';
import Sidebar from '../../Components/SideBar/AdminSideBar.jsx';
import mycontext from '../../Context/myContext.jsx';
import ProductForm from '../../Components/Product_Form/ProductForm.jsx';

const AdminCreateProduct = () => {
  
  return (
    <LayOut>
      <div className='border-2 border-yellow-700 flex flex-row'>
        <div>
          <Sidebar />
        </div>
        <div className='bg-red-100 w-[90%] justify-center'>
         
          <div className='bg-yellow-200 p-5'>
            <h1>Add form</h1>
            <ProductForm />
          </div>
        </div>
      </div>
    </LayOut>
  );
};

export default AdminCreateProduct;
