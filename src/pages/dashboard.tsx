import useRelayData from "@/hooks/useRelayData";
import Dashboard from "@/organisms/dashboard";
import { ContentsContainer } from "src/styles/common";

const DashboardPage = () => {
    useRelayData();

    return (
        <ContentsContainer>
            <Dashboard />
        </ContentsContainer>
    );
};

export default DashboardPage;
