import { useContext,useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { ContainerHabit,Header,Espaço } from "./HabitsPage";
import Footer from "./Footer";
import styled from "styled-components";
import TodayHabits from "./TodayHabits"
import dayjs from "dayjs";
import axios from "axios";
import 'dayjs/locale/pt-br';

export default function Today(){
    const {token, data, setTodayHabit, value, setValue} = useContext(UserContext);

    useEffect(()=>{

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config);

        promise.then(response => {
            setTodayHabit(response.data); 
            let k = 0;
            for(let i = 0;i < response.data.length;i++){
                if(response.data[i].done === true){
                    k++;
                }
            }
            if(response.data.length === 0){
                setValue(0);
            }else{
                setValue((100*(k/response.data.length)).toFixed()); 
            }   
        });

        promise.catch(Error => {
            alert(Error.response.data.message);
        })
    },[value]);
   
    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            <Espaço></Espaço>
            <SubTopo changeColor={value} >
                <h2>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h2>
                <h3>
                    {
                        value === 0 || isNaN(value) ? 'Nenhum hábito concluído ainda' : `${value}% dos hábitos concluídos`
                    }
                </h3>
            </SubTopo>
            <TodayHabits />
            <Espaço></Espaço>
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
        text-transform:capitalize;
        color: #126BA5;
        font-size: 24px;
    }

    h3{
        margin-left:18px;
        margin-right:18px;
        color: ${props => props.changeColor > 0 ? '#8FC549' : '#BABABA'};
        font-size:18px;
        transform: translateX(-0.2in);
    }
`