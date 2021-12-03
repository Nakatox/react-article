import React from 'react'
import {
    Navigate
  } from "react-router-dom";
import { getToken } from '../Services/API';

const PrivateRoute = (props) => {
    if(getToken()){
        return props.children
    }else{
        return <Navigate to="/login"></Navigate>
    }
}

export default PrivateRoute
