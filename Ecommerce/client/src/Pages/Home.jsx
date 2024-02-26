import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../Components/Layout/LayOut'
import Filter from '../Components/Filter/Filter.jsx';
import ProductCard from '../Components/Product Card/ProductCard.jsx';
import mycontext from '../Context/myContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home(props) {
    const contextData = useContext(mycontext);
    const { getAllProduct } = contextData


    const [fiterProducts, setFilterProducts] = useState([]);
    const [radio, setRadio] = useState([]); // Define radio state here
    const [selectedCategory, setSelectedCategory] = useState([]);


    // Handler function to update the selected category
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };



    const filterHandle = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/product/filter-product", {
                category: selectedCategory,
                radio: radio
            });

            setFilterProducts(data?.products);

            toast.success("product filtered")
            console.log("Filtered products:", data);
        } catch (error) {
            console.error("Error filtering products:", error);
        }
    };
    useEffect(() => {
        if (!radio.length || !selectedCategory.length) {
            getAllProduct();
        }
    }, [radio, selectedCategory]); // Include radio and selectedCategory in the dependency array

    useEffect(() => {
        if (radio.length || selectedCategory.length) {
            filterHandle();
        }
    }, [radio, selectedCategory]);
    return (
        <div>
            <LayOut>
                <div className='bg-red-200 flex'>
                    <div className='border-2 border-red-500 w-[50%]'>
                        <div>
                            <Filter
                                FilterHandle={filterHandle}
                                FiterProducts={fiterProducts}
                                HandleCategoryChange={handleCategoryChange}
                                Radio={radio} setRadio={setRadio}
                                SelectedCategory={selectedCategory}
                            />
                        </div>
                    </div>
                    <div className='border-2 border-green-500'>
                       
                        <ProductCard  FiterProducts={fiterProducts}/>
                    </div>
                </div>
            </LayOut>
        </div>
    )
}

export default Home;
