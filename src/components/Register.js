import { Container } from "./Login";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/Group 8.png"
import { useState } from "react";

export default function Register(){
    const navigate = useNavigate();
    
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [password,setPassword] = useState('');

    function registerUser(event){
        event.preventDefault();

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        {
            email,
            name,
            image,
            password
        });

        navigate("/")
    }
    
    return(
        <Container>
            <img src={logo} alt="" />
            <form onSubmit={registerUser}>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                <input type="text" required value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" />
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="nome" />
                <input type="text" required value={image} onChange={e => setImage(e.target.value)} placeholder="foto" />
                <button type="submit">Registrar</button>
            </form>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <h2>Já tem uma conta? Faça login!</h2>
            </Link>
        </Container>
    );
}