import styled from "styled-components";
import SummaryInfo from "./summaryInfo";
import Title from "./title";
import TxTable from "./txTable";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
`;

const Dashboard = () => {
    return (
        <Container>
            <Title />
            <SummaryInfo />
            <TxTable />
        </Container>
    );
};

export default Dashboard;
