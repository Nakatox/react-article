import React from 'react'
import styled from 'styled-components'
import EditInfosUser from '../Components/EditInfosUser'
import EditPassordUser from '../Components/EditPassordUser'



const Container = styled.div`
display: flex;
justify-content: space-around;

`

const EditUser = () => {

    return (
        <Container className="edit">
            <div>
                <h2>Change Personal informations :</h2>
                <EditInfosUser></EditInfosUser>
            </div>
            <div>
                <h2>Change password :</h2>
                <EditPassordUser></EditPassordUser>
            </div>
        </Container>
    )
}

export default EditUser
