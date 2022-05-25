import { Link, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import styled from "styled-components";
import logo from "../assets/images/Group 8.png"
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";

export default function Login(){

    const { token, setToken,setData} = useContext(UserContext);
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function requestLogin(event){
        event.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        {
            email,
            password
        });

        promise.then(response => {
            setToken(response.data.token);
            setData(response.data);
            navigate("/habitos");
        })

        if(!token){
            <Loading />
        }
    }

    return(
        <Container>
            <img src={logo} alt="" />
            <form onSubmit={requestLogin}>
                <input type="text" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                <input type="text" required value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" />
                <button type="submit">Entrar</button>
            </form>
            <Link to={'/cadastro'} style={{textDecoration: 'none'}}>
                <h2>Não tem uma conta? Cadastre-se!</h2>
            </Link>
        </Container>
    );
}

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    img{
        width: 180px;
        height: 250px;
        margin-top: 68px;
        margin-bottom: 32px;
    }

    input{
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        width: 300px;
        height: 46px;
        margin-bottom: 6px;
        padding-left: 8px;

        &::placeholder{
            font-size: 20px;
            color: #DBDBDB;
        }
    }

    button{
        border: 1px solid #52B6FF;
        background-color: #52B6FF;
        border-radius: 5px;
        width: 300px;
        height: 46px;
        margin-bottom: 26px;
        font-size: 22px;
        color: #ffffff;
    }

    h2{
        color: #52B6FF;
        text-decoration: underline;
    }
    
`
