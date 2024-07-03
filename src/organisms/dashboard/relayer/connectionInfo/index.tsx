import styled from "styled-components";
import ChainCard from "./chainCard";
import { CHANNEL_STATUS, CONNECT_TYPE } from "@/consts/types";
import { IC_ACTIVE_CIRCLE } from "@/consts/images";
import theme from "@/themes";
import { IRelayerState } from "@/consts/interface";
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

export interface ISummaryState {
    relayer: IRelayerState;
    counterParty: IRelayerState;
    createdAt: string;
    state: string;
    clientID: string;
}

const ConnectionInfo = () => {
    const { connection, channelStatus, relayer, counterParty } = useData();

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
        </Container>
    );
};

export default ConnectionInfo;
