import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { GetArtcilesAPI} from '../Services/API'
import Article from './Article'


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const AllArticles = (props) => {
    const [articles, setarticles] = useState([])

    const getArticles = async () => {
        let data = await GetArtcilesAPI(props)
        setarticles(data.data)
    }
    useEffect(() => {
        getArticles()
        console.log(articles);
    }, [props])

  
    return (
        <Container>
            {articles.map((data) => {
                return <Article key={data.id} location='all' data={data}></Article>
            })}
        </Container>
    )
}

export default AllArticles
