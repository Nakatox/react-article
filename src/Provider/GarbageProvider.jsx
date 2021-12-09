import React, {createContext, useState, useEffect} from 'react'
import { io} from 'socket.io-client'
import { getToken, GetUserInfoAPI, GetArtcileCategoriesAPI } from '../Services/API'


export const GarbageContext = createContext()

export const GarbageProvider = (props) => {


    const [userInfos, setUserInfos] = useState([])
    const [articlesCategory, setArticlesCategory] = useState([])
    const [usersPosition, setusersPosition] = useState([])
    const [userPosition, setuserPosition] = useState([])
    const [isLoaded, setisLoaded] = useState(false)



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

    if (!isLoaded){
        navigator.geolocation.getCurrentPosition(function(position) {
            setuserPosition([position.coords.latitude,position.coords.longitude]);
            console.log(userPosition);
            setisLoaded(true)
        });
    }

    useEffect(()=> {
        getInfosUser()
        getArticlesCategory()
        const socket = io("http://edu.project.etherial.fr/");
        if (getToken()){
            socket.emit("auth", getToken());
        }    
        socket.off('positions').on("positions", (data) => {
            socket.emit("update_position", {"point_lat":userPosition[0], "point_lon":userPosition[1]});
            setusersPosition(data)
        });
    }, [userPosition])

    return (
        <GarbageContext.Provider value={{userInfos,setUserInfos, articlesCategory, usersPosition}}>
            {props.children}
        </GarbageContext.Provider>
    )
}

