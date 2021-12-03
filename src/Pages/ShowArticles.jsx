import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Article from '../Components/Article';
import { GetArtcileAPI } from '../Services/API';
import {
    useParams
  } from "react-router-dom";

const ShowArticles = () => {

    const [article, setarticle] = useState([])
    let slug  = useParams();
    const getDataArticle = async () =>{
        let data = await GetArtcileAPI(slug.id)
        setarticle(data.data)
    }

    useEffect(() => {
        getDataArticle()
    }, [])

    return (
        <Article key={article.id} location='solo' data={article}></Article>
    )
}

export default ShowArticles
