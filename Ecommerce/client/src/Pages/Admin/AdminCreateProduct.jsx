import React, { useContext } from 'react'
import LayOut from '../../Components/Layout/LayOut.jsx'
import Sidebar from '../../Components/SideBar/AdminSideBar.jsx'
import ProductForm from '../../Components/Product_Form/ProductForm.jsx'
import mycontext from '../../Context/myContext.jsx'
// import Sidebar from '../../Components/SideBar/UserSideBar.jsx'

const AdminCreateProduct = () => {



  const contextData = useContext(mycontext);
  const { categories, setCategories, getAllCategory } = contextData
  useEffect(() => {
    getAllCategory()
  }, [])



  return (
    <LayOut>
      <div className='border-2 border-yellow-700 flex flex-row'>
        <div>

          <Sidebar />
        </div>



        <div className='bg-red-100 w-[90%] justify-center'>
          <h1> Create Product </h1>
          <ProductForm />
        </div>


      </div>
    </LayOut>
  )
}

export default AdminCreateProduct
