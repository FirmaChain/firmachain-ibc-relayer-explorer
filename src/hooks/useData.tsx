import { IAmountState } from "@/consts/interface";
import { DataContext } from "@/context/dataProvider";
import { convertNumber } from "@/utils/number";
import { FirmaUtil } from "@firmachain/firma-js";
import { useContext } from "react";

const useData = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }


    const calculateTotalVolumeAmount = (amounts: IAmountState[] | undefined) => {
        const currentValue = context.currentValue;
        if (amounts === undefined || currentValue === null) return '-';
        return amounts.reduce((total, item) => {
            return total + convertNumber(FirmaUtil.getFCTStringFromUFCTStr(item.amount)) * currentValue[item.denom].usd;
        }, 0).toFixed(2);
    };


    return {
        summaryData: context.summaryData,
        setSummaryData: context.setSummaryData,
        volumeData: context.volumeData,
        setVolumeData: context.setVolumeData,
        operators: context.operators,
        setOperators: context.setOperators,
        relayer: context.relayer,
        setRelayer: context.setRelayer,
        counterParty: context.counterParty,
        setCounterParty: context.setCounterParty,
        connection: context.connection,
        setConnection: context.setConnection,
        channelStatus: context.channelStatus,
        setChannelStatus: context.setChannelStatus,
        transactionsData: context.transactionsData,
        setTransactionsData: context.setTransactionsData,
        currentValue: context.currentValue,
        setCurrentValue: context.setCurrentValue,
        calculateTotalVolumeAmount
    };
};

export default useData;
