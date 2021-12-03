import React from 'react'
import { useForm} from "react-hook-form";
import { EditUserPasswordAPI } from '../Services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPassordUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const editUserPassword = async (data)=> {
        let response = await EditUserPasswordAPI(data)
        if(response.status >= 200 || response.status <= 299){
            toast.success('You have updated your password !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if (response.status >= 400 || response.status<=499 ){
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
        <div className="password">
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
                <form onSubmit={handleSubmit(editUserPassword)}>
                    <p>Old Password :</p>
                    <input type="password" {...register("password_old", {required:true})}/>
                    <p>New Password :</p>
                    <input type="password" {...register("password_new", {required:true})}/>
                    <p>New Password Verif :</p>
                    <input type="password" {...register("password_new_verif", {required:true})}/>
                    <br />
                    <input type="submit" value="Change password" />

                    {errors.password_old && <span>This field is required</span>}
                    {errors.password_new && <span>This field is required</span>}
                    {errors.password_new_verif && <span>This field is required</span>}
                </form>
            </div>
    )
}

export default EditPassordUser
