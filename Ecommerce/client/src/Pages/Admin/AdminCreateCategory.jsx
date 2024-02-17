import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import Sidebar from '../../Components/SideBar/SideBar'
import CreateCategoryForm from '../../Components/Form/CreateCategoryForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import mycontext from '../../Context/myContext'

function AdminCreateCategory() {

  const contextData = useContext(mycontext);
  const { categories, setCategories, getAllCategory } = contextData
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