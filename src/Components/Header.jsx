import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { GarbageContext } from '../Provider/GarbageProvider'
import { getToken } from '../Services/API'
import {useNavigate } from "react-router-dom";
import styled from 'styled-components'

const HeaderS = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: blueviolet;
color: white;
padding: 10px 30px;
`
const Container = styled.div`
display: flex;
flex-direction: row;
width: 20vw;
justify-content: space-between;
`

const Text = styled.div`
& > a{
    text-decoration: none;
    color: white;
    text-decoration: underline;
}
`
export const Header = () => {
    let naviguate = useNavigate()

    const {userInfos} = useContext(GarbageContext)

    const logout = () =>{
        localStorage.removeItem("token");
        naviguate('/login')
    }

    if (getToken()){
        if(typeof(userInfos)!== "undefined"){ 
            return (
                <HeaderS>
                    <Container className="header_menu" style={{marginRight:'20px'}}>
                        <Text><button onClick={()=>{logout()}}>Logout</button></Text>
                        <Text><NavLink to="/home">Home</NavLink></Text>
                        <Text><NavLink to="/articles">Articles</NavLink></Text>
                    </Container>
                    <Container className="user_infos">
                        <Text>{userInfos.name}</Text>
                        <Text>{userInfos.lastname}</Text>
                        <Text><NavLink to="user/edit">Edit</NavLink></Text>
                    </Container>
                </HeaderS>
            )
        }else{
            return(
            <HeaderS>
                    <Container className="header_menu" style={{marginRight:'20px'}}>
                        <Text><button onClick={()=>{logout()}}>Logout</button></Text>
                        <Text><NavLink to="/home">Home</NavLink></Text>
                        <Text><NavLink to="/articles">Articles</NavLink></Text>
                    </Container>
                    <Container className="user_infos">
                        <Text><NavLink to="user/edit">Edit</NavLink></Text>
                    </Container>
                </HeaderS>
            )
        }
    }else{
        return (
            <HeaderS>
                <Container className="header_menu">
                    <Text><NavLink to="/login">Login</NavLink></Text>
                    <Text><NavLink to="/register">Register</NavLink></Text>
                    <Text><NavLink to="/home">Home</NavLink></Text>
                    <Text><NavLink to="/articles">Articles</NavLink></Text>
            </Container>
          </HeaderS>
        )
    }
    
}
