import React, { useContext } from 'react'
import { useForm} from "react-hook-form";
import { GarbageContext } from '../Provider/GarbageProvider';
import { EditUserAPI } from '../Services/API';

const EditInfosUser = () => {

    const {userInfos} = useContext(GarbageContext)

    const { register,setValue, handleSubmit, formState: { errors } } = useForm();

    setValue("firstname", userInfos.firstname)
    setValue("lastname", userInfos.lastname)
    setValue("birthdate", userInfos.birthdate)

    const editUser = async (data)=> {
        let response = await EditUserAPI(data)
        
        if(response.status === 200){
            
        }else if (response.status === 400){

        }
    }
    
    return (
        <div className="personal_data">
                <form onSubmit={handleSubmit(editUser)}>
                    <p>Firstname :</p>
                    <input type="text" defaultValue={userInfos.firstname} {...register("firstname", {required:true})}  />
                    <p>Lastname :</p>
                    <input type="text" defaultValue={userInfos.lastname} {...register("lastname", {required:true})}/>
                    <p>BirthDate :</p>
                    <input type="date" defaultValue={userInfos.birthdate} {...register("birthdate", {required:true,valueAsDate: true})}/>
                    <input type="submit" value="Edit" />

                    {errors.firstname && <span>This field is required</span>}
                    {errors.lastname && <span>This field is required</span>}
                </form>
            </div>
    )
}

export default EditInfosUser
