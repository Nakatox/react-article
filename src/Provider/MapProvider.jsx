import React, {createContext, useState, useEffect} from 'react'
import { io} from 'socket.io-client'
import { getToken} from '../Services/API'


export const MapContext = createContext()

export const MapProvider = (props) => {
    const [usersPosition, setusersPosition] = useState([])
    const [userPosition, setuserPosition] = useState([])
    const [isLoaded, setisLoaded] = useState(false)

    if (!isLoaded){
        navigator.geolocation.getCurrentPosition(function(position) {
            setuserPosition([position.coords.latitude,position.coords.longitude]);
            setisLoaded(true)
        });
    }

    useEffect(() => {
        const socket = io("http://edu.project.etherial.fr/");
        if (getToken()){
            socket.emit("auth", getToken());
        }    
        socket.off('positions').on("positions", (data) => {
            socket.emit("update_position", {"point_lat":userPosition[0], "point_lon":userPosition[1]});
            setusersPosition(data)
        });
    }, [isLoaded])

    return (
        <MapContext.Provider value={{usersPosition}}>
            {props.children}
        </MapContext.Provider>
    )
}

export default MapProvider
