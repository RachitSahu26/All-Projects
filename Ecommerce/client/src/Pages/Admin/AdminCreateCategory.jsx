import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Components/Layout/LayOut.jsx';
import CreateCategoryForm from '../../Components/Form/CreateCategoryForm.jsx';
import mycontext from '../../Context/myContext';
import Sidebar from '../../Components/SideBar/AdminSideBar.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminCreateCategory() {
  // const contextData = useContext(mycontext);

  // ..............fetching another context ............
  const contextData = useContext(mycontext);
  const { auth } = contextData;

  const { categories, getAllCategory } = contextData;

  const [showModal, setShowModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});





  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/api/category/delete-category/${id}`, {
        headers: {
          Authorization: contextData.auth?.token,
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
  // ...................handle edit ......
  const handleEdit = (category) => {
    setEditedCategory(category);
    console.log(category)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditedCategory({});
    setShowModal(false);
  };






  const editHandle = async () => {
    try {

      console.log(editedCategory._id)
      console.log(editedCategory)

      const { data } = await axios.put(`http://localhost:3000/api/category/update-category/${editedCategory._id}`, {
        name: editedCategory.name,
        headers: {
          Authorization: contextData.auth?.token,
        },
      });

      if (data.success) {
        console.log(data.success);
        toast.success(`Category updated successfully`);
        getAllCategory();
        // setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };














  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
















  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <LayOut>
      <div className='border-2 flex border-yellow-400 m-2 p-1 rounded'>
        <div>
          <Sidebar />
        </div>
        <div className='text-black w-[90%] justify-center flex-col border-3'>
          <h1>Create Category</h1>
          <CreateCategoryForm />

          <div className='border-t-2 border-b-2 border-teal-400 mt-5'>
            <h4 className='text-center tex'>Data of the all category</h4>
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
                    <td className="border flex justify-center px-10 py-2 ">
                     
                     
                     
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                   
                   
                   
                   
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3  rounded"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          
          
          
          
          
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-black">Edit Category</h2>

                <div className="mb-4">
                  <label htmlFor="name" className="block font-semibold mb-2 text-black">Category Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border rounded text-black px-3 py-2"
                    value={editedCategory.name}
                    onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                  />
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-500 text-white font-semibold px-2 py-2 rounded" onClick={editHandle}>Save Changes</button>
                  <button type="button" onClick={handleCloseModal} className="bg-red-500 text-white font-semibold px-4 py-2 rounded">Cancel</button>
                </div>

              </div>
            </div>
          )}
        </div>
     
     
     
      </div>
    </LayOut>
  );
}

export default AdminCreateCategory;
