import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';


const Container2 = styled.div`
    border: solid #302C40 1px;
    background-color: #302C40;
    border-radius: 10px;
    margin: 5px 10px;
    padding: 5px 10px;
    width: 300px;
    cursor: pointer;
    &:hover{
    border-color: violet;
}
    &>p{
        color: white;
    }
    `

const Container3 = styled.div`
&>p:nth-child(1){
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}
&>p:nth-child(2){

    font-size: 25px;
    padding: 20px;
}

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
