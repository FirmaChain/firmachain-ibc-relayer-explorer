import DefaultCard from "@/components/card/defaultCard";
import theme from "@/themes";
import styled from "styled-components";
import { ISummaryState } from ".";
import { useMemo } from "react";
import { formatDateOrShowDistance, getUTCOffset, toUTCFormattedDate } from "@/utils/date";

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    overflow: hidden;

    @media only screen and (max-width: 960px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const CardContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 5px;

    @media only screen and (max-width: 960px) {
        gap: 0;
    }
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
`;

const TitleText = styled.div`
    font-size: 14px;
    color: ${theme.colors.titleText};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px 0;

    @media only screen and (max-width: 960px) {
        font-size: 12px;
    }
`;

const ValueBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
`;

const ValueText = styled.div`
    font-size: 18px;
    color: ${theme.colors.valueText};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 10px;
    padding-bottom: 5px;
    font-weight: 500;

    @media only screen and (max-width: 960px) {
        font-size: 14px;
    }
`;

interface IProps {
    data: ISummaryState | null;
}

const Summary = ({ data }: IProps) => {
    const Relayer = useMemo(() => {
        if (data === null) return "-";
        return `${data.relayer.name} / ${data.relayer.channelId}`;
    }, [data]);

    const CounterParty = useMemo(() => {
        if (data === null) return "-";
        return `${data.counterParty.name} / ${data.counterParty.channelId}`;
    }, [data]);

    const CreatedAt = useMemo(() => {
        if (data === null) return "-";
        return `${toUTCFormattedDate(data.createdAt, "MMM do, yyyy")} (${getUTCOffset(data.createdAt)})`;
    }, [data]);

    const OpeningPeriod = useMemo(() => {
        if (data === null) return "-";
        const createdAt = new Date(new Date(data.createdAt).getTime()).toISOString();
        const result = formatDateOrShowDistance(new Date(createdAt));
        return result;
    }, [data]);

    const State = useMemo(() => {
        if (data === null) return "-";
        return data.state.toUpperCase();
    }, [data]);

    const ClientID = useMemo(() => {
        if (data === null) return "-";
        return data.clientID;
    }, [data]);

    const Item = ({ title, value }: { title: string; value: string }) => {
        return (
            <DefaultCard fullWidth={true} backgroundColor={theme.colors.contentBackground} border>
                <CardContainer>
                    <TitleBox>
                        <TitleText>{title}</TitleText>
                    </TitleBox>
                    <ValueBox>
                        <ValueText>{value}</ValueText>
                    </ValueBox>
                </CardContainer>
            </DefaultCard>
        );
    };

    return (
        <Container>
            <Item title={"Relayer"} value={Relayer} />
            <Item title={"Counter Party"} value={CounterParty} />
            <Item title={"Created At"} value={CreatedAt} />
            <Item title={"Opening Period"} value={OpeningPeriod} />
            <Item title={"State"} value={State} />
            <Item title={"Client ID"} value={ClientID} />
        </Container>
    );
};

export default Summary;
