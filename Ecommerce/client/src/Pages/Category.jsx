import React, { useContext, useEffect } from 'react'
import LayOut from '../Components/Layout/LayOut'
import mycontext from '../Context/myContext'
import { Link } from 'react-router-dom';

const Category = () => {

  const contextData = useContext(mycontext);
  const { getAllCategory, categories } = contextData
  useEffect(() => {
    getAllCategory();
  }, [])
  return (
    <LayOut>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </LayOut>
  )
}

export default Category
