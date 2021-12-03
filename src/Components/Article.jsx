import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';


const Container2 = styled.div`
    border: solid black 1px;
    width: 300px;
    cursor: pointer;

    `

const Container3 = styled.div`
border: solid black 1px;
width: 300px;

`

const Article = (props) => {
    let naviguate = useNavigate()


    if (props.location == 'all'){
        return (
            <Container2 onClick={()=>{naviguate(`/articles/${props.data.id}`)}}>
                <p>{props.data.title}</p>
                <p>{props.data.content}</p>
            </Container2>
        )
    }else if(props.location == 'solo'){
        return(
            <Container3 >
                <p>{props.data.title}</p>
                <p>{props.data.content}</p>
            </Container3>
        )
    }
    
}

export default Article
