import React, { useContext, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import { MapContext } from '../Provider/MapProvider'
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"


const Container = styled.div`
    width: 300px;
    height: 300px;
    position:fixed;
    bottom:0;
    right:0;
    `

const Map = () => {

    const {usersPosition} = useContext(MapContext)
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
                        <ReactLeafletDriftMarker duration={1000} key={key} position={[data.location.latitude, data.location.longitude]}>
                            <Popup>
                                {data.name}
                            </Popup>
                        </ReactLeafletDriftMarker>)
                    )
                })}
            </MapContainer>
        </Container>
    )
}

export default Map
