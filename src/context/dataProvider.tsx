import { IChainState, IOperatorState, IPriceData, ISummaryState, ITransactionsState, IVolumesState } from "@/consts/interface";
import { CHANNEL_STATUS, CONNECT_TYPE } from "@/consts/types";
import React, { useState } from "react";

interface IDataContext {
    summaryData: ISummaryState | null;
    setSummaryData: (value: ISummaryState | null) => void;
    volumeData: IVolumesState | null;
    setVolumeData: (value: IVolumesState | null) => void;
    operators: IOperatorState[] | null;
    setOperators: (value: IOperatorState[] | null) => void;
    relayer: IChainState | null;
    setRelayer: (value: IChainState | null) => void;
    counterParty: IChainState | null;
    setCounterParty: (value: IChainState | null) => void;
    connection: CONNECT_TYPE;
    setConnection: (value: CONNECT_TYPE) => void;
    channelStatus: CHANNEL_STATUS;
    setChannelStatus: (value: CHANNEL_STATUS) => void;
    transactionsData: ITransactionsState | null;
    setTransactionsData: (value: ITransactionsState | null) => void;
    currentValue: IPriceData | null;
    setCurrentValue: (value: IPriceData) => void;
}

export const DataContext = React.createContext<IDataContext | null>(null);

const DataProvider = ({ children }: any) => {
    const [summaryData, setSummaryData] = useState<ISummaryState | null>(null);
    const [volumeData, setVolumeData] = useState<IVolumesState | null>(null);
    const [operators, setOperators] = useState<IOperatorState[] | null>(null);
    const [relayer, setRelayer] = useState<IChainState | null>(null);
    const [counterParty, setCounterParty] = useState<IChainState | null>(null);
    const [connection, setConnection] = useState<CONNECT_TYPE>("CLOSED");
    const [channelStatus, setChannelStatus] = useState<CHANNEL_STATUS>("WELL-KNOWN");
    const [transactionsData, setTransactionsData] = useState<ITransactionsState | null>(null);
    const [currentValue, setCurrentValue] = useState<IPriceData | null>(null);

    return (
        <DataContext.Provider
            value={{
                summaryData,
                setSummaryData,
                volumeData,
                setVolumeData,
                operators,
                setOperators,
                relayer,
                setRelayer,
                counterParty,
                setCounterParty,
                connection,
                setConnection,
                channelStatus,
                setChannelStatus,
                transactionsData,
                setTransactionsData,
                currentValue,
                setCurrentValue
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
