import styled from "styled-components";
import Card from "./card";
import { PRIMARYDATA_FOUR, PRIMARYDATA_ONE, PRIMARYDATA_THREE, PRIMARYDATA_TWO } from "@/consts/common";
import { formatDateOrShowDistance } from "@/utils/date";
import useTxData from "@/hooks/useTxData";
import { useMemo } from "react";
import useData from "@/hooks/useData";
import { convertCurrent, convertNumber } from "@/utils/number";
import { IAmountState, IVolumeState } from "@/consts/interface";
import { FirmaUtil } from "@firmachain/firma-js";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media only screen and (max-width: 960px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

const SummaryInfo = () => {
    const { calculateTotalVolumeAmount, volumeData, transactionsData } = useData();
    const { acknowledgement, received, transfer } = useTxData();

    const CurrentTx = useMemo(() => {
        if (acknowledgement === null || received === null || transfer === null) return '-';
        const totalList = [...acknowledgement, ...received, ...transfer];

        if (totalList.length === 0) return '-'
        const current = totalList.reduce((latest, current) => {
            return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest;
        }, totalList[0]);

        return formatDateOrShowDistance(new Date(current.timestamp))
    }, [acknowledgement, received, transfer]);

    const TotalTxCount = useMemo(() => {
        if (transactionsData === null) return '-'
        return transactionsData.month
    }, [transactionsData]);

    const totalReceivedSum = calculateTotalVolumeAmount(volumeData?.month.totalReceived);
    const totalSendSum = calculateTotalVolumeAmount(volumeData?.month.totalSend);


    return (
        <Container>
            <Card title={"Monthly IBC Txs"} value={TotalTxCount} background={PRIMARYDATA_ONE} />
            <Card title={'Monthly Receive Volume'} value={`$ ${convertCurrent(totalReceivedSum)}`} background={PRIMARYDATA_TWO} />
            <Card title={'Monthly Send Volume'} value={`$ ${convertCurrent(totalSendSum)}`} background={PRIMARYDATA_THREE} />
            <Card title={"Last Updated"} value={CurrentTx} background={PRIMARYDATA_FOUR} />
        </Container>
    );
};

export default SummaryInfo;
