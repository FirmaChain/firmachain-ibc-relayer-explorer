import { IVolumeGraph, IVolumeState } from "@/consts/interface";
import theme from "@/themes";
import { Fragment, useMemo } from "react";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import { convertCurrent } from "@/utils/number";
import useData from "@/hooks/useData";
import CircleProgress from "@/components/loading/circleProgress";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 0 20px 18px;

    @media only screen and (max-width: 960px) {
        flex-direction: column;
    }
`;

const GraphBox = styled.div`
    width: 100%;
    height: 200px;
    min-width: 200px;
    min-height: 200px;
`;

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`;

const ContentWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const TotalTitleText = styled.div`
    font-size: 16px;
    color: ${theme.colors.valueText};
`;

const TotalValueText = styled.div`
    font-size: 18px;
    color: ${theme.colors.valueText};
`;

const ItemTitleWrap = styled.div`
    display: flex;
    align-items: center;
    jutify-content: flex-start;
    gap: 5px;
`;

const ItemTitleDot = styled.div<{ $background: string }>`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: ${({ $background }) => $background};
`;

const ItemTitleText = styled.div`
    font-size: 14px;
    color: ${theme.colors.descText};
`;

const ItemValueText = styled.div`
    font-size: 16px;
    color: ${theme.colors.valueText};
`;

const TooltipBox = styled.div`
    display: flex;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.cardBorder};
    background: ${theme.colors.boxBackground};
`;

const LegendWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
`;

const LegendText = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${theme.colors.titleText};
`;

const TooltipValueText = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${theme.colors.valueText};
`;

const EmptyMessageText = styled.div`
    width: 100%;
    padding: 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: ${theme.colors.descText};
    background: ${theme.colors.contentBackground};
    border-radius: 8px;
    gap: 5px;
`

interface IProps {
    data: IVolumeState | null;
}

const Volume = ({ data }: IProps) => {
    const { calculateTotalVolumeAmount } = useData();

    const totalReceivedSum = calculateTotalVolumeAmount(data?.totalReceived);
    const totalSendSum = calculateTotalVolumeAmount(data?.totalSend);

    const GraphData: IVolumeGraph[] = useMemo(() => {
        if (data === null) return [];
        return [
            { id: "received", label: "Total Received (Week)", value: Number(totalReceivedSum), color: theme.colors.connectionInactive },
            { id: "send", label: "Total Sent (Week)", value: Number(totalSendSum), color: theme.colors.connectionActive },
        ];
    }, [data]);

    const TotalTxAmount = useMemo(() => {
        if (totalReceivedSum === '-' || totalSendSum === '-') return "-";
        return (Number(totalReceivedSum) + Number(totalSendSum)).toString();
    }, [totalReceivedSum, totalSendSum]);

    return (
        <Container>
            {data === null ?
                <EmptyMessageText>{"Loading"}<CircleProgress /></EmptyMessageText>
                :
                <Fragment>
                    <GraphBox>
                        <ResponsivePie
                            data={GraphData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            innerRadius={0.7}
                            padAngle={0.7}
                            colors={{ datum: "data.color" }}
                            borderWidth={1}
                            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                            animate={true}
                            arcLinkLabelsSkipAngle={10}
                            enableArcLinkLabels={false}
                            arcLinkLabelsTextColor="#333333"
                            enableArcLabels={false}
                            arcLinkLabelsColor={{ from: "color" }}
                            arcLabelsSkipAngle={10}
                            activeOuterRadiusOffset={3}
                            arcLabelsTextColor="#333333"
                            tooltip={(value) => {
                                const data = value.datum;
                                return (
                                    <TooltipBox>
                                        <LegendWrap>
                                            <ItemTitleDot $background={data.color} />
                                            <LegendText>{data.label}</LegendText>
                                            <TooltipValueText>{`$ ${convertCurrent(data.value)}`}</TooltipValueText>
                                        </LegendWrap>
                                    </TooltipBox>
                                );
                            }}
                        />
                    </GraphBox>
                    <ContentBox>
                        <ContentWrap>
                            <TotalTitleText>{"TotalTransfers (Week)"}</TotalTitleText>
                            <TotalValueText>{`$ ${convertCurrent(TotalTxAmount)}`}</TotalValueText>
                        </ContentWrap>
                        {GraphData.map((value, index) => {
                            return (
                                <ContentWrap key={`${value.id}-${index}`}>
                                    <ItemTitleWrap>
                                        <ItemTitleDot $background={value.color} />
                                        <ItemTitleText>{value.label}</ItemTitleText>
                                    </ItemTitleWrap>
                                    <ItemValueText>{`$ ${convertCurrent(value.value)}`}</ItemValueText>
                                </ContentWrap>
                            );
                        })}
                    </ContentBox>
                </Fragment>
            }
        </Container>
    );
};

export default Volume;
