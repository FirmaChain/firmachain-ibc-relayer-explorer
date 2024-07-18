import useRelayData from "@/hooks/useRelayData";
import useRelayTxData from "@/hooks/useRelayTxData";
import Dashboard from "@/organisms/dashboard";
import { ContentsContainer } from "src/styles/common";

const DashboardPage = () => {
    useRelayData();
    useRelayTxData();

    return (
        <ContentsContainer>
            <Dashboard />
        </ContentsContainer>
    );
};

export default DashboardPage;
