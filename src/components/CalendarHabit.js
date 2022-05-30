import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import styled from "styled-components";

export default function CalendarHabits({idDay}){
    const { historicData } = useContext(UserContext);

    let aux = ''

    for(let i = 0; i < historicData.length;i++){
        if(idDay.idDay === historicData[i].day[0]+historicData[i].day[1]){
            aux = [...historicData[i].habits]
        }
    }

    console.log(aux)
    return(
        aux.map((item,index)=>
        <Habit key={index}>
            <h3>{item.name}</h3>
        </Habit>
        )
    );
}

const Habit = styled.div`
display: flex;
justify-content: center;
align-items: center;
    background-color: #ffffff;
    border-radius: 5px;
    width: 340px;
    height: 90px;
    padding: 10px;
    margin-bottom: 10px;
`

