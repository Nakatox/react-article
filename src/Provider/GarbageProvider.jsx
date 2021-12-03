import React, {createContext, useState, useRef, useEffect} from 'react'
import { getToken, GetUserInfoAPI, GetArtcileCategoriesAPI } from '../Services/API'

export const GarbageContext = createContext()

export const GarbageProvider = (props) => {


    const [userInfos, setUserInfos] = useState([])
    const [articlesCategory, setArticlesCategory] = useState([])


    const getInfosUser = async () => {
        let token = getToken()
        if (token != ""){
            let infosUser = await GetUserInfoAPI(token)
            setUserInfos(infosUser.data);
        }
    }

    const getArticlesCategory = async () =>{
        let data = await GetArtcileCategoriesAPI()
        setArticlesCategory(data.data)
    }

    useEffect(()=> {
        getInfosUser()
        getArticlesCategory()
    }, [])

    return (
        <GarbageContext.Provider value={{userInfos,setUserInfos, articlesCategory}}>
            {props.children}
        </GarbageContext.Provider>
    )
}

