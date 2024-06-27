import { IC_FIRMA_LOGO_40 } from "@/consts/images";
import theme from "@/themes";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 80px 30px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`;

const TitleText = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: ${theme.colors.valueText};

    @media only screen and (max-width: 768px) {
        font-size: 30px;
        white-space: pre-line;
        text-align: center;
    }
`;

const LogoImg = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
`;

const Title = () => {
    return (
        <Container>
            <LogoImg src={IC_FIRMA_LOGO_40} alt={"Firmachain"} />
            <TitleText>{"IBC RELAYER\nEXPLORER"}</TitleText>
        </Container>
    );
};

export default Title;
