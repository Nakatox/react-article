import React, { useContext } from 'react'
import { useForm} from "react-hook-form";
import { EditUserPasswordAPI } from '../Services/API';

const EditPassordUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const editUserPassword = async (data)=> {
        let response = await EditUserPasswordAPI(data)
        console.log(data);
        // if(response.status === 200){
            
        // }else if (response.status === 400){

        // }
    }
    return (
        <div className="password">
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
