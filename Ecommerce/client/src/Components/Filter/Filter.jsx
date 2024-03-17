import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/myContext';
import { Price } from '../Price.js';
import { Radio } from "antd";
import axios from 'axios';

const Filter = ({
    FilterHandle,
    HandleCategoryChange,
    setRadio,
    SelectedCategory,
}) => {
    const contextData = useContext(mycontext);
    const { categories, getAllCategory } = contextData;

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div className="bg-gray-100 p-4 rounded-lg sticky top-0">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                {/* Close button for small screens */}
                <button className="sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 1 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {/* Filter content */}
            <div className="mb-4">
                {/* Category filter */}
                <label htmlFor="category" className="block font-semibold mb-2">Category</label>
                <select
                    id="category"
                    className="w-full border rounded px-3 py-2"
                    value={SelectedCategory}
                    onChange={HandleCategoryChange} // Update selected category on change
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            {/* Price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column m-5">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Price?.map((p, index) => (
                        <div key={index} className="p-[10%]">
                            <Radio value={p.name}>{p.name}</Radio> {/* Use radioValue prop instead of p.array */}
                        </div>
                    ))}
                </Radio.Group>
            </div>
            {/* Apply and Reset buttons */}
            <div className='flex flex-col gap-2 p-5'>
                <button onClick={FilterHandle} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded">Apply Filters</button>
                <button onClick={() => window.location.reload()} className="bg-red-500 text-white font-semibold px-4 py-2 rounded">Reset Filters</button>
            </div>
        </div>
    );
};

export default Filter;
