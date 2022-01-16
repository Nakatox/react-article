import React, {createContext, useState, useEffect} from 'react'
import { getToken, GetUserInfoAPI, GetArtcileCategoriesAPI } from '../Services/API'
import { GetArtcilesAPI} from '../Services/API'


export const GarbageContext = createContext()

export const GarbageProvider = (props) => {


    const [userInfos, setUserInfos] = useState([])
    const [articlesCategory, setArticlesCategory] = useState([])
    const [firstArticles, setfirstarticles] = useState([])

    const getInfosUser = async () => {
        let token = getToken()
        if (token !== ""){
            let infosUser = await GetUserInfoAPI(token)
            setUserInfos(infosUser.data);
        }
    }

    const getArticlesCategory = async () =>{
        let data = await GetArtcileCategoriesAPI()
        setArticlesCategory(data.data)
    }

    const getFirstArticles = async () => {
        let data = await GetArtcilesAPI({"limit":20, "offset":0})
        setfirstarticles(data.data)
    }
    

    useEffect(()=> {
        getInfosUser()
        getArticlesCategory()
        getFirstArticles()
    }, [])

    return (
        <GarbageContext.Provider value={{userInfos,setUserInfos, articlesCategory, firstArticles, getFirstArticles}}>
            {props.children}
        </GarbageContext.Provider>
    )
}

