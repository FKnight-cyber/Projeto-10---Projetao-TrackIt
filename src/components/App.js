import React from "react"
import {BrowserRouter,Routes,Route } from "react-router-dom"
import GlobalStyle from "../theme/globalStyles";
import Login from "./Login";
import Register from "./Register";
import HabitsPage from "./HabitsPage";
import Today from "./Today";
import Historic from "./Historic";
import UserContext from "../contexts/UserContext";

export default function App(){
    const [token, setToken] = React.useState(false);
    const [data, setData] = React.useState('');
    const userContext = {token, setToken,data,setData};

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
            </Routes>
            </UserContext.Provider>
            </BrowserRouter>  
    );
}