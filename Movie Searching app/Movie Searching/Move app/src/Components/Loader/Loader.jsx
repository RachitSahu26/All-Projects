// Loader.js
import React, { useCallback, useContext, useEffect } from 'react';
import mycontext from '../../Context/Data/MyContext';
const Loader = () => {
    
 const context =useContext(mycontext);
 const {loading, setLoading}=context;
    useEffect(() => {
      // Simulate an asynchronous operation
      const delay = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(delay);
    }, []);




  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
    </div>
  );
};

export default Loader;
