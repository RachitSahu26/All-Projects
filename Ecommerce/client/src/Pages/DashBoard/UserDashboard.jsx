import React, { useContext } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import mycontext from '../../Context/myContext';

function UserDashboard() {

  const ContextData = useContext(mycontext)
  const { auth, setAuth } = ContextData;
  return (
    <LayOut>
      UserDashboard
      <h1>
        <h1>Name:{auth.user.name}</h1>
        <h1>Email:{auth.user.email}</h1>
        <h1>Phone:{auth.user.phone}</h1>
        <h1>Address:{auth.user.address}</h1>

      </h1>
    </LayOut>
  )
}

export default UserDashboard
