import DefaultCard from "@/components/card/defaultCard";
import theme from "@/themes";
import styled from "styled-components";
import ConnectionInfo from "./connectionInfo";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const TitleText = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors.titleText};

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`;

const Relayer = () => {
    return (
        <DefaultCard fullWidth={true} backgroundColor={theme.colors.boxBackground}>
            <Container>
                <TitleBox>
                    <TitleText>{"IBC Relayer"}</TitleText>
                </TitleBox>
                <ConnectionInfo />
            </Container>
        </DefaultCard>
    );
};

export default Relayer;
