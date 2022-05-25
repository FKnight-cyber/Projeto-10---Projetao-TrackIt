import { useContext,useState } from "react";
import UserContext from "../contexts/UserContext";
import { ContainerHabit } from "./HabitsPage";
import { Header } from "./HabitsPage";
import Footer from "./Footer";

export default function Today(){
    const {token, data} = useContext(UserContext);
    const {value, setValue} = useState(10);
    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            
            <Footer value={value} />
        </ContainerHabit>
    );
}