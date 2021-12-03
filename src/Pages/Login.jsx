import React from 'react'
import { useForm} from "react-hook-form";
import {useNavigate } from "react-router-dom";
import { LoginAPI } from '../Services/API';



const Login = () => {

    let naviguate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await LoginAPI(data)
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            naviguate('/home')
        }else if (response.status === 400){

        }
    }
    return (
        <div className="login">
             <form onSubmit={handleSubmit(onSubmit)}>
                <p>Email :</p>
                <input type="text" defaultValue="vincent2.loron@sfr.fr" {...register("email", {required:true})} />
                <p>Password :</p>
                <input type="password" {...register("password", {required:true})}/>
                <input type="submit" value="Login" />

                {errors.email && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}
            </form>
        </div>
    )
}

export default Login
