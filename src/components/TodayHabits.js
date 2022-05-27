import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import axios from "axios";

export default function TodayHabits(){
    const {token, todayHabit,setTodayHabit,setValue } = useContext(UserContext);

    function toggleCheck(ID_DO_HABITO){

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

        for(let i = 0;i < todayHabit.length;i++){
            if(todayHabit[i].id === ID_DO_HABITO){
                if(todayHabit[i].done === true){
                    const promise = axios.post(
                        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${ID_DO_HABITO}/uncheck`,null,
                        config);
            
                    promise.then(response => {
                        const aux = [...todayHabit];
                        for(let i = 0;i < aux.length;i++){
                            if(aux[i].id === ID_DO_HABITO){
                                aux[i].done = false;
                            }
                        }
                        setTodayHabit([...aux]);
                        updateHabits();
                    })
            
                    promise.catch(Error => {
                        alert(Error.response.data.message);
                    })
                }else{
                    const promise = axios.post(
                        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${ID_DO_HABITO}/check`,null,
                        config);
            
                    promise.then(response => {
                        const aux = [...todayHabit];
                        for(let i = 0;i < aux.length;i++){
                            if(aux[i].id === ID_DO_HABITO){
                                aux[i].done = true;
                            }
                        }
                        setTodayHabit([...aux]);
                        updateHabits();
                    })
            
                    promise.catch(Error => {
                        alert(Error.response.data.message);
                    })
                }
            }
        }
    }

    function updateHabits(){
        let k = 0;
       for(let i = 0;i < todayHabit.length;i++){
           if(todayHabit[i].done === true){
                k++;
           }
       }

       setValue((100*(k/todayHabit.length)).toFixed());
    }

    return(todayHabit.map((item,index) => 
        <TodayHabit key={index}>
            <Info current={item.currentSequence} highest={item.highestSequence} >
                <h1>{item.name}</h1>
                <div>
                <h2>Sequência atual: </h2>
                <h3>{item.currentSequence} dias</h3>
                </div>
                <div>
                <h2>Seu recorde: </h2>
                <h4>{item.highestSequence} dias</h4>
                </div>
            </Info>
            <CheckBox changeColor={item.done} onClick={() => toggleCheck(item.id)}>
                <IoCheckmarkSharp style={{color:'#ffffff', width:36, height:28 }} />
            </CheckBox>
        </TodayHabit>
    )
    );
}

const TodayHabit = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    width: 340px;
    height: 94px;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 12px;
`

const Info = styled.div`
    h1{
        color: #666666;
        font-size:20px;
        margin-bottom: 6px;
    }

    h2{
        color: #666666;
    }

    h3{
        color: ${props => 
        (props.current > 1 || props.current === props.highest) && props.current !== 0 ? '#8FC549' : '#666666'};
        transform: translateX(-0.15in);
        font-size: 16px;
    }

    h4{
        color: ${props => (props.highest === props.current) && props.highest !== 0 ? '#8FC549' : '#666666'};
        transform: translateX(0.05in);
        font-size: 16px;
    }

    div{
        display: flex;
    }
`

const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.changeColor ? '#8FC549' : '#E7E7E7'};
    border-radius: 5px;
    width: 68px;
    height: 68px;
`