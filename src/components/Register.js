import { Container } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/Group 8.png"
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false)

    function registerUser(event) {
        event.preventDefault();

        setLoad(true);

        const myImage = URL.createObjectURL(image)
        console.log(myImage)

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            {
                email,
                name,
                myImage,
                password
            });

        promise.then(response => {
            setLoad(false);
            navigate("/");
        })

        promise.catch(Error => {
            alert(Error.response.data.message);
            setLoad(false);
        })

    }

    return (
        <Container>
            <img src={logo} alt="" />
            <form onSubmit={registerUser}>
                <input disabled={load} type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                <input disabled={load} type="text" required value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" />
                <input disabled={load} type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="nome" />
                <input disabled={load} type="text" required value={image} onChange={(e) => setImage(e.target.value)} placeholder="foto" />
                <button disabled={load} type="submit">
                    {
                        load ? <ThreeDots
                            color="#ffffff"
                            height={40}
                            width={40}
                            ariaLabel="three-circles-rotating"
                        /> : 'Cadastrar'
                    }
                </button>
            </form>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h2>Já tem uma conta? Faça login!</h2>
            </Link>
        </Container>
    );
}