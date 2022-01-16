import React, { useContext, useEffect, useState } from 'react'

import styled from 'styled-components'
import { GarbageContext } from '../Provider/GarbageProvider'
import { GetArtcilesAPI} from '../Services/API'
import Article from './Article'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
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
const AllArticles = (lastarticles) => {

    const {firstArticles} = useContext(GarbageContext)
    const [articles, setarticles] = useState(firstArticles)
    const [offset, setoffset] = useState(0)

    const getArticles = async () => {
        let data = await GetArtcilesAPI({"limit":20, "offset":offset})
        setarticles(data.data)
    }
    useEffect(() => {
        if (offset !== 0){
            getArticles(offset)
        }else{
            setarticles(firstArticles)
        }
    }, [offset, firstArticles, lastarticles])


    return (
        <div>
            <Container>
                {articles.map((data) => {
                    return <Article key={data.id} location='all' data={data}></Article>
                })}
            </Container>

            <ContainerButton>
                <Button onClick={()=>{offset !== 0 ? setoffset(offset - 10): setoffset(0)}}>{'<'}</Button>
                <Input type="text" value={offset/10} onChange={(e)=>{setoffset(e.target.value)}} />
                <Button onClick={()=>{setoffset(offset + 10)}}>{'>'}</Button>
            </ContainerButton>
        </div>

    )
}

export default AllArticles
