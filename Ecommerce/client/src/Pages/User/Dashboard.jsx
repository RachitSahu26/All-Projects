import React, { useContext } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import mycontext from '../../Context/myContext';

function Dashboard() {

  const ContextData = useContext(mycontext)
  const { auth, setAuth } = ContextData;
  return (
    <LayOut>
      Dashboard

      <h1>
        {JSON.stringify(auth)}
      </h1>
    </LayOut>
  )
}

export default Dashboard
