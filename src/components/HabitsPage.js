import styled from "styled-components";
import Habits from "./Habits";
import Footer from "./Footer";
import { useState,useContext,useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function HabitsPage(){

    const {token, data} = useContext(UserContext);

    const [habits,setHabits] = useState('')
    const [enabled,setEnabled] = useState(false)

    useEffect(()=>{
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            config
          );
          promise.then((res) => {
            setHabits(res.data);
          });
    },[])

    function getHabits(){
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            config
          );
          promise.then((res) => {
            setHabits(res.data);
          });
    }

    function toggleHabit(){
        setEnabled(!enabled);
    }

    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            <CreateButton>
                <h1>Meus hábitos</h1>
                <button onClick={toggleHabit}>+</button>
            </CreateButton>
            <CriarHabito habilitado={enabled}>
                <input type="text" placeholder="nome do hábito" />
                <CheckBox>
                    <div>D</div>
                    <div>S</div>
                    <div>T</div>
                    <div>Q</div>
                    <div>Q</div>
                    <div>S</div>
                    <div>S</div>
                </CheckBox>
                <ButtonBox>
                    <h2 onClick={toggleHabit}>Cancelar</h2>
                    <button>Salvar</button>
                </ButtonBox>    
            </CriarHabito>
            <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
            <Habits />
            <Footer />
        </ContainerHabit>
    );
}

export const ContainerHabit = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2{
        color: #52B6FF;
        font-size: 16px;
    }

    h3{
        margin-left:18px;
        margin-right:18px;
        color:#666666;
        font-size:18px;
    }
`

export const Header = styled.div`
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top:0;

    > img {
      &:first-child {
        object-fit: cover;
        width: 98px;
        height: 48px;
        margin-left: 16px;
      }
    }

    > img {
      &:last-child {
        object-fit: cover;
        border-radius: 50%;
        width: 52px;
        height: 52px;
        margin-right: 16px;
      }
    }
`

const CriarHabito = styled.div`
    display: ${props => props.habilitado ? 'flex' : 'none'};
    flex-direction: column;
    background-color:#ffffff;
    width: 340px;
    height: 180px;

    input{
        border: 1px solid #D4D4D4;
        color:#dbdbdb;
        border-radius:5px;
        font-size: 20px;
        width: 300px;
        height: 46px;

        padding-left: 8px;
    }
`

const CheckBox = styled.div`
    display: flex;
    justify-content:space-evenly;
    margin-top:6px;
    width: 270px;
    margin-bottom:20px;

    div{
        border: 1px solid #D4D4D4;
        display: flex;
        justify-content:center;
        align-items:center;
        border-radius:5px;
        width: 30px;
        height: 30px;
        background-color: #ffffff;
        color:#DBDBDB;
    }
`

const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;

    button{
        border: none;
        border-radius: 5px;
        width: 84px;
        height: 36px;
        background-color: #52B6FF;
        color: #ffffff;
        font-size: 16px;
        margin-left: 22px;
    }
`

const CreateButton = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    h1{
        font-size: 22px;
        color: #126BA5;
    }

    button{
        width: 40px;
        height: 36px;
        border-radius: 5px;
        border: none;
        background-color: #52B6FF;
        color: #ffffff;
        font-size:30px;
    }
`

