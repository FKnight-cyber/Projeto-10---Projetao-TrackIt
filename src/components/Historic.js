import { useContext,useState,useEffect} from "react";
import UserContext from "../contexts/UserContext";
import { ContainerHabit,Header,Espaço } from "./HabitsPage";
import Footer from "./Footer";
import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Historic(){
    const {data, value, token,historicData,setHistoricData} = useContext(UserContext);
    const navigate = useNavigate();

    const [calDate, setCalDate] = useState(new Date());

    let today = new Date().toLocaleDateString('pt-br');
    let aux = []

    useEffect(()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",config);

        promise.then(response =>{
            setHistoricData(response.data);
        });
    },[]);

    function onChange (calDate) {
        setCalDate(calDate)
    }

    for(let i = 0;i < historicData.length;i++){
        aux.push(historicData[i].day[0]+historicData[i].day[1]);
    }
 
    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            <Espaço></Espaço>
            <SubTopo changeColor={value} >
                <h2>Histórico</h2>
            </SubTopo>
            <div>
            <Calendar 
            onChange={onChange} 
            value={calDate} 
            locale={'pt-br'}
            tileClassName={({ date, view }) => {
                for(let i = 0; i < historicData.length;i++){
                    if(historicData[i].day === moment(date).format("DD/MM/YYYY")){
                        for(let j = 0; j < historicData[i].habits.length;j++){
                            let k = 0;
                            if(historicData[i].habits[j].done === true){
                                k++
                            }
                            if(k === historicData[i].habits.length && historicData[i].day !== today){
                                return 'fez'
                            }
                            if(k !== historicData[i].habits.length && historicData[i].day !== today){
                                return 'naoFez'
                            }
                        }
                    }
                }
              }}
              onClickDay={(value)=>{
                  if(aux.includes(value.getDate().toString()) && value.getDate().toString() !== today[0]+today[1]){
                    navigate(`/${value.getDate()}`);
                  }     
              }}
            />
            </div>
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