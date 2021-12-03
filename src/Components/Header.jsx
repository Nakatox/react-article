import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { GarbageContext } from '../Provider/GarbageProvider'
import { getToken } from '../Services/API'
import {useNavigate } from "react-router-dom";
import styled, { css } from 'styled-components'


export const Header = () => {
    let naviguate = useNavigate()

    const {userInfos} = useContext(GarbageContext)

    const logout = () =>{
        localStorage.removeItem("token");
        naviguate('/login')
    }

   
    const Container = styled.div`
        display: flex;
        flex-direction: row;
        width: 20vw;
        justify-content: space-between;
        `

    if (getToken()){
        return (
            <Container>
                <Container className="header_menu" style={{marginRight:'20px'}}>
                    <p style={{cursor:'pointer', textDecorationLine:'underline', color:'blue'}} onClick={()=>{logout()}}>Logout</p>
                    <p><NavLink to="/home">Home</NavLink></p>
                    <p><NavLink to="/articles">Articles</NavLink></p>
                </Container>
                <Container className="user_infos">
                    <p>{userInfos.firstname}</p>
                    <p>{userInfos.lastname}</p>
                    <p><NavLink to="user/edit">Edit</NavLink></p>
                </Container>
            </Container>
        )
    }else{
        return (
            <Container className="header_menu">
                <p><NavLink to="/login">Login</NavLink></p>
                <p><NavLink to="/register">Register</NavLink></p>
          </Container>
        )
    }
    
}
