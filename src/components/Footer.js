import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer({value}){
    return(
        <FooterStyle>
            <Link to={"/habitos"} style={{textDecoration: 'none'}}>
                <h2>Hábitos</h2>
            </Link>
            <Link to={"/hoje"} style={{textDecoration: 'none'}}>
            <div style={{ width: 92, height: 92 }}>
                <CircularProgressbar 
                value={value}
                text={'Hoje'}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#3e98c7",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent"
                })} 
                />
            </div>
            </Link>
            <Link to={"/historico"} style={{textDecoration: 'none'}}>
                <h2>Histórico</h2>
            </Link>
        </FooterStyle>
    );
}

const FooterStyle = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    background-color: #ffffff;
    width: 100%;
    height: 70px;
    bottom: 0;

    div{
        transform: translateY(-0.3in);
    }

    h2{
        font-size: 20px;
    }
`
