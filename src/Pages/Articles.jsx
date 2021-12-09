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
const ContainerButton = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
`
const Input = styled.input`
width: 20px;

`

const Button = styled.button`

    background-color: blueviolet;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    `


const Articles = () => {
    const [limit, setlimit] = useState(10)
    const [offset, setoffset] = useState(0)
    const [idCategory, setidCategory] = useState(10)

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
            {/* <div>
                <p>Number per page :</p>
                <input type="range" min="1" max="100" value={limit}  onChange={(e)=>{setlimit(e.target.value)}}/>
            </div> */}
            <div>
                <AllArticles limit={limit} offset={offset}></AllArticles>
            </div>
            <ContainerButton>
                <Button onClick={()=>{offset !== 0 ? setoffset(offset - 10): setoffset(0)}}>{'<'}</Button>
                <Input type="text" value={offset/10} onChange={(e)=>{setoffset(e.target.value)}} />
                <Button onClick={()=>{setoffset(offset + 10)}}>{'>'}</Button>
            </ContainerButton>
        </Container>
    )
}

export default Articles
