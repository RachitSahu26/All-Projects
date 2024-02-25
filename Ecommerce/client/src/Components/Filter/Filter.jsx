import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';
import { Price } from '../Price.js';
import { Radio } from "antd";
import axios from 'axios';
const Filter = () => {


    // .........................context data.const.............
    const contextData = useContext(mycontext);
    const {
        categories, getAllCategory,
        auth, setAuth,
        selectedCategory, setSelectedCategory,
        radio, setRadio,

        filterHandle
    } = contextData







    useEffect(() => {
        getAllCategory();
    }, [])
    return (



        <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>



            {/* .................category.............. */}
            <div className="mb-4">
                <label htmlFor="category" className="block font-semibold mb-2">Category</label>
                <select
                    id="category"

                    className="w-full border rounded px-3 py-2"

                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}


                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>




            {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Price?.map((p) => (
                        <div key={p._id}>
                            <Radio value={p.array}>{p.name}</Radio>
                        </div>
                    ))}
                </Radio.Group>
            </div>

            {/* ........................btn........... */}

            <div className='flex flex-col gap-2'>

                <button onClick={filterHandle} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded">Apply Filters</button>
                <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded">Reset Filters</button>

            </div>

        </div>
    );
};

export default Filter;
