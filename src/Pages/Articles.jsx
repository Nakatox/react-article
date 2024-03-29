import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import AllArticles from '../Components/AllArticles'
import { CreateArtcileAPI, getToken } from '../Services/API'
import Select from 'react-select'
import { GarbageContext } from '../Provider/GarbageProvider'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
margin: 30px;
`

const Articles = () => {

    const [idCategory, setidCategory] = useState(10)
    const [lastarticles, setlastarticles] = useState([])

    const {articlesCategory} = useContext(GarbageContext)

    const option = []

    articlesCategory.forEach(element => {
        let value = {'value':element.id, 'label':element.name}
        option.push(value)
    });


    const { register, handleSubmit } = useForm();
    const onSubmit = async (data)=> {
        let response = await CreateArtcileAPI({"title":data.title, "content":data.content,"article_category_id":idCategory})
        if(response.status >= 200 && response.status <= 299){
            setlastarticles(response.data.id)
            toast.success('Your article have been added !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
        }else if (response.status >= 400 && response.status<=499){
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
        <Container>
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
            {getToken() && 
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>title :</p>
                        <input type="text" {...register("title", {required:true})} />
                        <p>content :</p>
                        <input type="text" {...register("content", {required:true})}/>
                        <Select options={option} onChange={(e)=>{setidCategory(e.value)}}/>
                        <input type="submit" value="Add article" />
                    </form>
                </div>
            }
            <div>
                <AllArticles lastarticles={lastarticles}></AllArticles>
            </div>
        </Container>
    )
}

export default Articles
