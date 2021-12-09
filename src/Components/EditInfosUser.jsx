import React, { useContext, useState } from 'react'
import { useForm} from "react-hook-form";
import { GarbageContext } from '../Provider/GarbageProvider';
import { EditUserAPI } from '../Services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInfosUser = () => {

    const {userInfos} = useContext(GarbageContext)
    const [isLoaded, setisLoaded] = useState(false)

    const { register,setValue, handleSubmit, formState: { errors } } = useForm();

    if (userInfos.length !== 0) {
        setValue("firstname", userInfos.firstname)
        setValue("lastname", userInfos.lastname)
        setValue("birthdate", userInfos.birthdate)
    }
    

    const editUser = async (data)=> {
        let response = await EditUserAPI(data)
        
        if(response.status >= 200 || response.status <= 299){
            toast.success('You have updated your informations !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
        }else if (response.status >= 400 || response.status<=499){
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
        <div className="personal_data">
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
                <form onSubmit={handleSubmit(editUser)}>
                    <p>Firstname :</p>
                    <input type="text" defaultValue={userInfos.firstname} {...register("firstname", {required:true})}  />
                    <p>Lastname :</p>
                    <input type="text" defaultValue={userInfos.lastname} {...register("lastname", {required:true})}/>
                    <p>BirthDate :</p>
                    <input type="date" defaultValue={userInfos.birthdate} {...register("birthdate", {required:true,valueAsDate: true})}/>
                    <br />
                    <input type="submit" value="Edit" />

                    {errors.firstname && <span>This field is required</span>}
                    {errors.lastname && <span>This field is required</span>}
                </form>
            </div>
    )
}

export default EditInfosUser
