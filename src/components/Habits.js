import { CheckBox } from "./HabitsPage";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";

export default function Habits(){
    const { habitData,setHabitData, token } = useContext(UserContext);

    function removeHabit(ID_DO_HABITO){
        console.log(ID_DO_HABITO)

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        if (window.confirm("Você quer remover esse hábito?")){
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${ID_DO_HABITO}`,config);

            promise.then(response => {
                alert("post deletado");
                let aux = [...habitData];
                aux = aux.filter(item => item.id !== parseInt(ID_DO_HABITO))
                setHabitData([...aux]);
            })

            promise.catch(Error => {
                alert(Error.response.data.message);
            })
        }
    }

    return(
        habitData.map((item,index)=>
        <Habit key={index}>
            <HabitHeader>
                <h3>{item.name}</h3>
                <IoTrashOutline id={item.id} onClick={e => removeHabit(e.target.id)} />
            </HabitHeader>
            <CheckBox>
                <Box boxColor={item.days.includes(7)} >D</Box>
                <Box boxColor={item.days.includes(1)} >S</Box>
                <Box boxColor={item.days.includes(2)} >T</Box>
                <Box boxColor={item.days.includes(3)} >Q</Box>
                <Box boxColor={item.days.includes(4)} >Q</Box>
                <Box boxColor={item.days.includes(5)} >S</Box>
                <Box boxColor={item.days.includes(6)} >S</Box>
            </CheckBox>
        </Habit>
        )
    );
}

const Habit = styled.div`
    background-color: #ffffff;
    border-radius: 5px;
    width: 340px;
    height: 90px;
    padding: 10px;
    margin-bottom: 10px;

    h3{
        transform: translateX(-0.1in);
        padding-left: 0;
    }
`

const HabitHeader = styled.div`
    display: flex;
    position: relative;

    > * {
            &:last-child{
            position: absolute;
            width: 20px;
            height: 20px;
            right: 0;
        }
    }
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