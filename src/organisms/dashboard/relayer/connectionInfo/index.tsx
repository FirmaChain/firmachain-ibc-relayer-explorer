import styled from "styled-components";
import ChainCard from "./chainCard";
import { CHANNEL_STATUS, CONNECT_TYPE } from "@/consts/types";
import { IC_ACTIVE_CIRCLE } from "@/consts/images";
import theme from "@/themes";
import { useState } from "react";
import TabContainer from "@/components/tab/tabContainer";
import Tab from "@/components/tab/tab";
import Summary from "./summary";
import Volume from "./volume";
import Operators from "./operators";
import useData from "@/hooks/useData";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`;

const Box = styled.div`
    width: 100%;
    max-width: 725px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 20px 40px;
    border-radius: 8px;
    background: ${theme.colors.contentBackground};
    border: 1px solid ${theme.colors.cardBorder};


    @media only screen and (max-width: 768px) {
        padding: 20px;
    }
`;

const ConnectionSignalBox = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 25px;
`;

const ConnectionLine = styled.div<{ $connect: CONNECT_TYPE; $status: CHANNEL_STATUS }>`
    ${({ $connect, $status }) =>
        $connect === "OPENED"
            ? $status === "WELL-KNOWN"
                ? `background: ${theme.colors.connectionActive}`
                : `background: ${theme.colors.connectionUnknown}`
            : `background: ${theme.colors.connectionInactive}`};
    width: 100%;
    height: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ConnectionImg = styled.img`
    width: 30px;
    height: 30px;
    object-fit: contain;
`;

const ConnectionText = styled.div<{ $connect: CONNECT_TYPE; $status: CHANNEL_STATUS }>`
    ${({ $connect, $status }) =>
        $connect === "OPENED" ? ($status === "WELL-KNOWN" ? `color: ${theme.colors.connectionActive}` : `color: ${theme.colors.connectionUnknown}`) : `color: ${theme.colors.connectionInactive}`};
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;

    @media only screen and (max-width: 768px) {
        font-size: 10px;
    }
`;

const ConnectionInfo = () => {
    const [tab, setTab] = useState(0);
    const { summaryData, volumeData, operators, connection, channelStatus, relayer, counterParty } = useData();

    return (
        <Container>
            <Box>
                <ChainCard position={"LEFT"} connection={connection} channelStatus={channelStatus} chain={relayer} />
                <ConnectionSignalBox>
                    <ConnectionLine $connect={connection} $status={channelStatus}>
                        <ConnectionImg style={{ display: connection === "OPENED" ? "block" : "none" }} src={IC_ACTIVE_CIRCLE} alt={"connect"} />
                    </ConnectionLine>
                    <ConnectionText style={{ opacity: connection === 'OPENED' ? 1 : 0 }} $connect={connection} $status={channelStatus}>
                        {channelStatus}
                    </ConnectionText>
                </ConnectionSignalBox>
                <ChainCard position={"RIGHT"} connection={connection} channelStatus={channelStatus} chain={counterParty} />
            </Box>
            <TabContainer>
                <Tab title={"Summary"} active={tab === 0} onClick={() => setTab(0)} />
                <Tab title={"Volume"} active={tab === 1} onClick={() => setTab(1)} />
                <Tab title={"Operators"} active={tab === 2} onClick={() => setTab(2)} />
            </TabContainer>
            {tab === 0 && <Summary data={summaryData} />}
            {tab === 1 && <Volume data={volumeData === null ? null : volumeData.week} />}
            {tab === 2 && <Operators data={operators} />}
        </Container>
    );
};

export default ConnectionInfo;
