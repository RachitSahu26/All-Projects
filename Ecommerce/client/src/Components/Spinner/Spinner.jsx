import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {
    // { path = "signin" }

    // const [count, setCount] = useState(2);
    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCount((prevValue) => --prevValue);
    //     }, 1000);
    //     count === 0 &&
    //         navigate(`/${path}`, {
    //             state: location.pathname,
    //         });
    //     return () => clearInterval(interval);
    // }, [count, navigate, location, path]);



    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        
        <div>
        <h1 className="Text-center">redirecting to you in count second </h1>
        </div>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    );
};

export default Spinner;
