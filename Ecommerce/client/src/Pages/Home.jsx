import React, { useContext } from 'react'
import LayOut from '../Components/Layout/LayOut'
import mycontext from '../Context/myContext.jsx';
// import { json } from 'react-router-dom';

function Home(props) {

    const ContextData = useContext(mycontext)
    const { auth, setAuth } = ContextData;
    return (
        <div>
            <LayOut>
                <div className='bg-teal-500 h-5 p-16'>

                    <h1>Name:{auth.user.name}</h1>
                    <h1>Email:{auth.user.email}</h1>
                    <h1>Phone:{auth.user.phone}</h1>
                    <h1>Address:{auth.user.address}</h1>

                </div>

            </LayOut>

        </div>
    )
}

export default Home
