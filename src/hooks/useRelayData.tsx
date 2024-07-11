import useAPI from "@/api/api";
import useData from "./useData";
import { useEffect } from "react";
import { IC_FIRMA_LOGO_40, IC_OSMOSIS } from "@/consts/images";
import { CHANNEL_STATUS, CONNECT_TYPE } from "@/consts/types";

const useRelayData = () => {
    const { getRelayStatus } = useAPI();
    const { setSummaryData, setVolumeData, setOperators, setRelayer, setCounterParty, setConnection, setChannelStatus, setTransactionsData } = useData();

    useEffect(() => {
        Promise.all([getRelayStatus()])
            .then(([status]) => {
                setSummaryData({
                    relayer: status.relayer,
                    counterParty: status.counterParty,
                    createdAt: status.createdAt,
                    state: status.status,
                    clientID: status.clientId,
                });

                setVolumeData(status.volume);

                setOperators(status.operators);

                setRelayer({ ...status.relayer, icon: IC_FIRMA_LOGO_40 });
                setCounterParty({ ...status.counterParty, icon: IC_OSMOSIS });

                setConnection(status.status as CONNECT_TYPE);
                setChannelStatus(status.statusText as CHANNEL_STATUS);

                setTransactionsData(status.transactions);
            })
            .catch(() => { });
    }, []);

    return {
        getRelayStatus,
    };
};

export default useRelayData;
