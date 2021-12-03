import React, { useContext } from 'react'
import { useForm} from "react-hook-form";
import {useNavigate } from "react-router-dom";
import { GarbageContext } from '../Provider/GarbageProvider';
import { GetUserInfoAPI, LoginAPI } from '../Services/API';



const Login = () => {

    const {setUserInfos} = useContext(GarbageContext)


    let naviguate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await LoginAPI(data)
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            let infosUser = await GetUserInfoAPI(response.data.token)
            setUserInfos(infosUser.data);
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
