import { useState } from "react"
import {BrowserRouter,Routes,Route } from "react-router-dom"
import GlobalStyle from "../theme/globalStyles";
import Login from "./Login";
import Register from "./Register";
import HabitsPage from "./HabitsPage";
import Today from "./Today";
import Historic from "./Historic";
import UserContext from "../contexts/UserContext";
import DayHabits from "./DayHabits";

export default function App(){
    const [token, setToken] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("userinfo")));
    const [habitData,setHabitData] = useState('');
    const [todayHabit,setTodayHabit] = useState([]);
    const [value, setValue] = useState(0);
    const [historicData, setHistoricData] = useState('');
    const userContext = {token, setToken, data, setData, habitData, setHabitData,
    todayHabit, setTodayHabit, value, setValue,historicData,setHistoricData};

    return(    
            <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={userContext}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/habitos" element={<HabitsPage />} />
                <Route path="/hoje" element={<Today />} />
                <Route path="/historico" element={<Historic />} />
                <Route path="/:idDay" element={<DayHabits />} />
            </Routes>
            </UserContext.Provider>
            </BrowserRouter>  
    );
}