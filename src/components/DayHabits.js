import styled from "styled-components";
import CalendarHabit from "./CalendarHabit";
import Footer from "./Footer";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useParams } from "react-router-dom";

export default function HabitsPage(){

    const {data, value } = useContext(UserContext);

    const idDay = useParams();

    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            <Espaço></Espaço>
            <CreateButton>
                <h1>Hábitos do dia {idDay.idDay}</h1>
            </CreateButton>
            <CalendarHabit idDay={idDay} />
            <Espaço></Espaço>
            <Footer value={value} />
        </ContainerHabit>
    );
}

export const ContainerHabit = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #E5E5E5;
    min-height: 915px;

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
    z-index: 1;
    top:0;

    h1{
        color: #ffffff;
        font-family: 'Playball', cursive;
        font-size: 38px;
        margin-left: 10px;
    }

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

export const CheckBox = styled.div`
    display: flex;
    justify-content:space-evenly;
    margin-top:6px;
    width: 270px;
    margin-bottom: 20px;

`

const CreateButton = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    padding-left: 18px;
    padding-right: 18px;

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

export const Espaço = styled.div`
    height: 120px;
`