import React, { useContext, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import { GarbageContext } from '../Provider/GarbageProvider'
// import 'leaflet/dist/leaflet.css';


const Container = styled.div`
    width: 300px;
    height: 300px;
    position:fixed;
    bottom:0;
    right:0;
    `

const Map = () => {

    const {usersPosition} = useContext(GarbageContext)
    useEffect(() => {
        
    }, [usersPosition])
    
    return (
        <Container >
            <MapContainer style={{width:'300px',height:'300px'}} center={[48.856614, 2.3522219]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {usersPosition.length !== 0 && Object.entries(usersPosition.data).map(([key, data]) => {
                    return(
                        Object.keys(data).length !== 0 &&(
                        <Marker key={key} position={[data.location.latitude, data.location.longitude]}>
                            <Popup>
                                {data.name}
                            </Popup>
                        </Marker>)
                    )
                })}
            </MapContainer>
        </Container>
    )
}

export default Map
