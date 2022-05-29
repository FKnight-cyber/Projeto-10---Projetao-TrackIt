import styled from "styled-components";
import Habits from "./Habits";
import Footer from "./Footer";
import { useState,useContext,useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function HabitsPage(){

    const {token, data, habitData, setHabitData, value } = useContext(UserContext);

    const [enabled,setEnabled] = useState(false);
    const [habitName,setHabitName] = useState('');
    const [habitDays,setHabitDays] = useState([]);
    const [changeColor,setChangeColor] = useState([false,false,false,false,false,false,false]);
    const [load,setLoad] = useState(false);

    useEffect(()=>{
        setLoad(true)
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
            setHabitData(res.data);
            setLoad(false)
          });

          promise.catch(Error => {
            setLoad(false);
            alert(Error.response.data.message)
        });
    },[])

    function createHabit(event){
        event.preventDefault();

        if(habitDays.length === 0){
            alert("Você deve selecionar pelo menos um dia!");
            return;
        }

        setLoad(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const body = {
            name: habitName,
            days: habitDays
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",body,config);

        promise.then((res) => {
            setHabitData([...habitData, res.data]);
            setLoad(false);
            setEnabled(false);
            setHabitName('');
            setHabitDays([]);
            setChangeColor([false,false,false,false,false,false,false]);
            }
        );

        promise.catch(Error => {
            setLoad(false);
            alert(Error.response.data.message)
        });
    }

    function checkDay(day){
        
        if(!habitDays.includes(day)){
            setHabitDays([...habitDays, day])
        }else{
            const aux = [...habitDays];
            aux.splice(aux.indexOf(day),1);
            setHabitDays([...aux]);
        }
        
        const aux = [...changeColor];
        aux[day] = !aux[day]
        setChangeColor([...aux]);
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
            <Espaço></Espaço>
            <CreateButton>
                <h1>Meus hábitos</h1>
                <button onClick={toggleHabit}>+</button>
            </CreateButton>
            <CriarHabito habilitado={enabled}>
                <form onSubmit={createHabit}>
                    <input disabled={load} type="text" value={habitName} onChange={e => setHabitName(e.target.value)} placeholder="nome do hábito" />
                    <CheckBox>
                        <Box disabled={load} boxColor={changeColor[0]} onClick={() => checkDay(0)}>D</Box>
                        <Box disabled={load} boxColor={changeColor[1]} onClick={() => checkDay(1)}>S</Box>
                        <Box disabled={load} boxColor={changeColor[2]} onClick={() => checkDay(2)}>T</Box>
                        <Box disabled={load} boxColor={changeColor[3]} onClick={() => checkDay(3)}>Q</Box>
                        <Box disabled={load} boxColor={changeColor[4]} onClick={() => checkDay(4)}>Q</Box>
                        <Box disabled={load} boxColor={changeColor[5]} onClick={() => checkDay(5)}>S</Box>
                        <Box disabled={load} boxColor={changeColor[6]} onClick={() => checkDay(6)}>S</Box>
                    </CheckBox>
                    <ButtonBox>
                        <h2 onClick={toggleHabit}>Cancelar</h2>
                        <button type="submit">
                        {
                        load ? <ThreeDots
                        color="#ffffff"
                        height={40}
                        width={40}
                        ariaLabel="three-circles-rotating"
                        /> : "Salvar"
                        }
                        </button>
                    </ButtonBox>  
                </form>  
            </CriarHabito>
            {
                habitData.length === 0 ? 
                <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3> 
                : <Habits />
            }
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

const CriarHabito = styled.div`
    display: ${props => props.habilitado ? 'flex' : 'none'};
    flex-direction: column;
    background-color:#ffffff;
    width: 340px;
    height: 180px;
    padding: 16px;
    margin-bottom: 12px;

    input{
        border: 1px solid #D4D4D4;
        color:#666666;
        border-radius:5px;
        font-size: 20px;
        width: 300px;
        height: 46px;

        padding-left: 8px;
    }
`

export const CheckBox = styled.div`
    display: flex;
    justify-content:space-evenly;
    margin-top:6px;
    width: 270px;
    margin-bottom: 20px;

`

const Box = styled.div`
        border: 1px solid #D4D4D4;
        display: flex;
        justify-content:center;
        align-items:center;
        border-radius:5px;
        width: 30px;
        height: 30px;
        background-color: ${ props => props.boxColor ? '#CFCFCF' : '#ffffff' };
        color: ${ props => props.boxColor ? '#ffffff' : '#DBDBDB' };
`

const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;

    button{
        display: flex;
        justify-content: center;
        align-items: center;
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
    height: 70px;
`

