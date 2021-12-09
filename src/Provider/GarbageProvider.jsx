import React, {createContext, useState, useEffect} from 'react'
import { io} from 'socket.io-client'
import { getToken, GetUserInfoAPI, GetArtcileCategoriesAPI } from '../Services/API'


export const GarbageContext = createContext()

export const GarbageProvider = (props) => {


    const [userInfos, setUserInfos] = useState([])
    const [articlesCategory, setArticlesCategory] = useState([])
    const [usersPosition, setusersPosition] = useState([])


    const getInfosUser = async () => {
        let token = getToken()
        if (token !== ""){
            let infosUser = await GetUserInfoAPI(token)
            console.log(infosUser);
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
        const socket = io("http://edu.project.etherial.fr/");
        if (getToken()){
            socket.emit("auth", getToken());
        }    
        socket.off('positions').on("positions", (data) => {
            socket.emit("update_position", {"point_lat":48.858765, "point_lon":2.293762});
            setusersPosition(data)
        });
    }, [])

    return (
        <GarbageContext.Provider value={{userInfos,setUserInfos, articlesCategory, usersPosition}}>
            {props.children}
        </GarbageContext.Provider>
    )
}

