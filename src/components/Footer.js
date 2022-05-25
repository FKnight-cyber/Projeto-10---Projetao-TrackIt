import styled from "styled-components";

export default function Footer(){
    return(
        <FooterStyle>
            <h2>Hábitos</h2>
            <div>
                <div>
                    <h4>Hoje</h4>
                </div>
            </div>
            <h2>Histórico</h2>
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
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 92px;
        height: 92px;
        background-color: #52B6FF;
        color: #ffffff;
        transform: translateY(-30%);


        div{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border: 6px solid #ffffff;
            border-radius: 50%;
            border-left-color: transparent;
            transform: rotate(30deg);

            h4{
                font-size: 18px;
                transform: rotate(-30deg);
            }
        }
    }

    h2{
        font-size: 20px;
    }
`