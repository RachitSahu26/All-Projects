import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Components/Layout/LayOut.jsx';
// import Sidebar from '../../Components/SideBar/AdminSideBar.jsx';
import mycontext from '../../Context/myContext.jsx';
import ProductForm from '../../Components/Product_Form/ProductForm.jsx';

const AdminCreateProduct = () => {

  return (
    <LayOut>
      <div className='border-2  flex flex-row'>
     
     
     
        <div className=' w-[100%]  justify-center'>
          <div className=' p-2 border-2 bg-black ' >
             <ProductForm />
          </div>
        </div>
     
     
     
      </div>
    </LayOut>
  );
};

export default AdminCreateProduct;
