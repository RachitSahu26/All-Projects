import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/Layout/LayOut.jsx'

import CreateCategoryForm from '../../Components/Form/CreateCategoryForm.jsx'

import mycontext from '../../Context/myContext'
import Sidebar from '../../Components/SideBar/AdminSideBar.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminCreateCategory() {
  // .........................context data......................
  const contextData = useContext(mycontext)
  const { categories, getAllCategory, } = contextData;

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/api/category/delete-category/${id}`, {
        headers: {
          Authorization: contextData.auth?.token, // Access auth object from contextData
        },
      });
  
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };




  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <LayOut>
      <div className='border-2 border-yellow-700 flex'>
        <div>

          <Sidebar />
        </div>



        <div className='bg-red-100  w-[90%] justify-center flex-col border-3 '>
          <h1>Create Category</h1>
          <CreateCategoryForm />



          {/* .....................showind created category.......... */}



          <div className='border-4 mt-5 border-yellow-500 '>
            <h4>data of the all category</h4>




            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 w-1/2">Name</th>
                  <th className="px-4 py-2 w-1/2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td className="border px-4 py-2">{c.name}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"

                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>

        </div>


      </div>
    </LayOut>
  )
}

export default AdminCreateCategory