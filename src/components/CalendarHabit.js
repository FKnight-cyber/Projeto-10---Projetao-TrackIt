import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import styled from "styled-components";
import { IoCheckmarkSharp,IoCloseOutline } from "react-icons/io5";

export default function CalendarHabits({idDay}){
    const { historicData } = useContext(UserContext);

    let aux = ''

    for(let i = 0; i < historicData.length;i++){
        if(idDay.idDay === historicData[i].day[0]+historicData[i].day[1]){
            aux = [...historicData[i].habits]
        }
    }

    return(
        aux.map((item,index)=>
        <Habit key={index} background={item.done}>
            <div>
                <h1>{item.name}</h1>
            </div>
            <div>
                {
                    item.done ? 
                    <IoCheckmarkSharp
                        color={'#ffffff'} 
                        style={{height:'30px',width:'30px'}} 
                    /> 
                    :
                    <IoCloseOutline
                        color={'#ffffff'} 
                        style={{height:'30px',width:'30px'}}
                    />
                }
            </div>
        </Habit>
        )
    );
}

const Habit = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 5px;
    width: 340px;
    height: 90px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 20px;

    > div {
      &:last-child {
        background-color: ${props => props.background ? 'green' : 'red'};
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 2px #888888;
        border: solid 1px #000000;
        height: 60px;
        width: 60px;
      }
    }
`

