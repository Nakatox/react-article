import React from 'react'
import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from '../Services/API';


const Register = () => {

    let naviguate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await RegisterAPI(data)
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            naviguate('/home')
        }else if (response.status === 400){

        }
    }
    return (
        <div className="register">
             <form onSubmit={handleSubmit(onSubmit)}>
                <p>Firstname :</p>
                <input type="text" defaultValue="" {...register("firstname", {required:true})} />
                <p>Lastname :</p>
                <input type="text" {...register("lastname", {required:true})}/>
                <p>Email :</p>
                <input type="text" defaultValue="vincent.loron@sfr.fr" {...register("email", {required:true})} />
                <p>Password :</p>
                <input type="password" {...register("password", {required:true})}/>
                <p>Password Verif :</p>
                <input type="password" {...register("password_verif", {required:true})}/>
                <input type="submit" value="Register" />

                {errors.email && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}
                {errors.password_verif && <span>This field is required</span>}
                {errors.firstname && <span>This field is required</span>}
                {errors.lastname && <span>This field is required</span>}
            </form>
        </div>
    )
}

export default Register
