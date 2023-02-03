import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

function PrivateRoute() {
    // const user = { userId: "value" } //pretend this is coming from global state
    const user = {  } //pretend this is coming from global state
  return Object.keys(user).length === 0 ? <Navigate to="/login" /> : <Outlet />
}

export default PrivateRoute