import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import AllArticles from '../Components/AllArticles'
import { CreateArtcileAPI, getToken } from '../Services/API'
import Select from 'react-select'
import { GarbageContext } from '../Provider/GarbageProvider'
import styled from 'styled-components'

const Container = styled.div`
margin: 30px;
`

const Articles = () => {
    const [limit, setlimit] = useState(20)
    const [offset, setoffset] = useState(0)
    const [idCategory, setidCategory] = useState(10)

    const {articlesCategory} = useContext(GarbageContext)

    const option = []

    articlesCategory.forEach(element => {
        let value = {'value':element.id, 'label':element.name}
        option.push(value)
    });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await CreateArtcileAPI({"title":data.title, "content":data.content,"article_category_id":idCategory})
        if(response.status === 200){
            
        }else if (response.status === 400){

        }
    }
    return (
        <Container>
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
                <p>Page :</p>
                <input type="range" min="1" max="100" value={offset}  onChange={(e)=>{setoffset(e.target.value)}}/>
                <p>Number per page :</p>
                <input type="range" min="1" max="100" value={limit}  onChange={(e)=>{setlimit(e.target.value)}}/>
            </div>
            <div>
                <AllArticles limit={limit} offset={offset}></AllArticles>
            </div>
        </Container>
    )
}

export default Articles
