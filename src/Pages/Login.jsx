import React, { useContext } from 'react'
import { useForm} from "react-hook-form";
import {useNavigate } from "react-router-dom";
import { GarbageContext } from '../Provider/GarbageProvider';
import { GetUserInfoAPI, LoginAPI } from '../Services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

    const {setUserInfos} = useContext(GarbageContext)


    let naviguate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await LoginAPI(data)
        if(response.status >= 200 && response.status <= 299){
            localStorage.setItem('token', response.data.token);
            let infosUser = await GetUserInfoAPI(response.data.token)
            setUserInfos(infosUser.data);
            naviguate('/home')
            toast.success('You are loged on !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if (response.status >= 400 && response.status<=499 ){
            toast.error('wrong information', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
    return (
        <div className="login">
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
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
