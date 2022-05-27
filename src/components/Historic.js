import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { ContainerHabit,Header,Espaço } from "./HabitsPage";
import Footer from "./Footer";
import styled from "styled-components";


export default function Historic(){
    const {data, value} = useContext(UserContext);
 
    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            <Espaço></Espaço>
            <SubTopo changeColor={value} >
                <h2>Histórico</h2>
                <h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
            </SubTopo>
            <Footer value={value} />
        </ContainerHabit>
    );
}

const SubTopo = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    margin-top: 28px;
    margin-bottom:28px;
    padding-left: 18px;

    h2{
        color: #126BA5;
        font-size: 24px;
    }

    h3{
        margin-left:18px;
        margin-right:18px;
        color: #666666;
        font-size:18px;
        transform: translateX(-0.2in);
    }
`