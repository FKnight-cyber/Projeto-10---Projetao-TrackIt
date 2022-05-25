import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { ContainerHabit } from "./HabitsPage";
import { Header } from "./HabitsPage";
import Footer from "./Footer";

export default function Historic(){
    const {token, data} = useContext(UserContext);
    return(
        <ContainerHabit>
            <Header>
                <h1>TrackIt</h1>
                <img src={data.image} alt="" />
            </Header>
            
            <Footer />
        </ContainerHabit>
    );
}