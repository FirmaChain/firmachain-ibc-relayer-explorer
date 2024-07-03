import { IC_FIRMA_LOGO_40 } from "@/consts/images";
import { IChainState } from "@/consts/interface";
import { CHANNEL_STATUS, CONNECT_TYPE } from "@/consts/types";
import theme from "@/themes";
import styled, { keyframes } from "styled-components";

const ConnectionChainBox = styled.div<{ $position: "LEFT" | "RIGHT" }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    ${({ $position }) => $position === "LEFT" && "margin-right: -13px"};
    ${({ $position }) => $position === "RIGHT" && "margin-left: -13px"};


    @media only screen and (max-width: 768px) {
    ${({ $position }) => $position === "LEFT" && "margin-right: -20px"};
    ${({ $position }) => $position === "RIGHT" && "margin-left: -20px"};
    }
`;

const ChainLogoBox = styled.div`
    border: 2px solid ${theme.colors.defaultBorder}30;
    border-radius: 100%;
    padding: 10px;
    position: relative;
`;

const ChainLogoConnectionLine = styled.div<{ $connect: CONNECT_TYPE; $status: CHANNEL_STATUS }>`
    ${({ $connect, $status }) =>
        $connect === "OPENED"
            ? $status === "WELL-KNOWN"
                ? `border: 2px solid ${theme.colors.connectionActive}`
                : `border: 2px solid ${theme.colors.connectionUnknown}`
            : `border: 2px solid ${theme.colors.connectionInactive}`};
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    background: ${theme.colors.boxBackground};
    position: relative;

    @media only screen and (max-width: 768px) {
        height: 50px;
        width: 50px;
    }
`;

const growAndFadeAnim = keyframes`
    0% {
        width: 60px;
        height: 60px;
        opacity: 1;
    }
    50% {
        width: 80px;
        height: 80px;
        opacity: 0;
    }
    100% {
        width: 60px;
        height: 60px;
        opacity: 0;
    }
`;

const growAndFadeAnimMobile = keyframes`
    0% {
        width: 50px;
        height: 50px;
        opacity: 1;
    }
    50% {
        width: 70px;
        height: 70px;
        opacity: 0;
    }
    100% {
        width: 50px;
        height: 50px;
        opacity: 0;
    }
`;

const ChainConnectionDot = styled.div<{ $connect: CONNECT_TYPE; $status: CHANNEL_STATUS }>`
    ${({ $connect, $status }) =>
        $connect === "OPENED"
            ? $status === "WELL-KNOWN"
                ? `background:  ${theme.colors.connectionActive}`
                : `background:  ${theme.colors.connectionUnknown}`
            : `background:  ${theme.colors.connectionInactive}`};
    z-index: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${growAndFadeAnim} 1.5s infinite;


    @media only screen and (max-width: 768px) {
    animation: ${growAndFadeAnimMobile} 1.5s infinite;
    }
`;

const ChainLogoImg = styled.img`
    width: 45px;
    height: 45px;
    object-fit: contain;

    @media only screen and (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`;

const ChainInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const ChainNameText = styled.div`
    color: ${theme.colors.valueText};
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
`;

const ChainNetworkText = styled.div`
    color: ${theme.colors.descText};
    font-weight: 400;
    font-size: 12px;
    white-space: nowrap;

    @media only screen and (max-width: 768px) {
        font-size: 10px;
    }
`;
interface IProps {
    connection: CONNECT_TYPE;
    channelStatus: CHANNEL_STATUS;
    position: "LEFT" | "RIGHT";
    chain: IChainState | null;
}

const ChainCard = ({ connection, channelStatus, position, chain }: IProps) => {
    const chainName = chain === null ? "-" : chain.name;
    const channelId = chain === null ? "-" : chain.channelId;
    return (
        <ConnectionChainBox $position={position}>
            <ChainLogoBox>
                <ChainConnectionDot $connect={connection} $status={channelStatus} />
                <ChainLogoConnectionLine $connect={connection} $status={channelStatus}>
                    {chain === null ? <ChainLogoImg src={IC_FIRMA_LOGO_40} alt={"Firmachain"} /> : <ChainLogoImg src={chain.icon} alt={chain.name} />}
                </ChainLogoConnectionLine>
            </ChainLogoBox>
            <ChainInfoBox>
                <ChainNameText>{chainName}</ChainNameText>
                <ChainNetworkText>{channelId}</ChainNetworkText>
            </ChainInfoBox>
        </ConnectionChainBox>
    );
};

export default ChainCard;
