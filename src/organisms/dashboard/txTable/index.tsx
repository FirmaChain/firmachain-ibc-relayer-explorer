import DefaultCard from "@/components/card/defaultCard";
import useTxData from "@/hooks/useTxData";
import theme from "@/themes";
import styled from "styled-components";
import TableCard from "./tableCard";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
`;

const TableBox = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 30px;
`

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
`;

const TxTable = () => {
    const { acknowledgement, received, transfer } = useTxData();

    return (
        <DefaultCard fullWidth={true} backgroundColor={theme.colors.boxBackground}>
            <Container>
                <TitleBox>
                    <TitleText>{"Latest 100 Transactions"}</TitleText>
                </TitleBox>
                <TableBox>
                    <TableCard title={"IBC Acknowledgement"} data={acknowledgement} />
                    <TableCard title={"IBC Received"} data={received} />
                    <TableCard title={"IBC Transfer"} data={transfer} />
                </TableBox>
            </Container>
        </DefaultCard>
    );
};

export default TxTable;
