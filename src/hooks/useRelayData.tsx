import useAPI from "@/api/api";
import useData from "./useData";
import { useEffect } from "react";
import { IC_FIRMA_LOGO_40, IC_OSMOSIS } from "@/consts/images";
import { CHANNEL_STATUS, CONNECT_TYPE } from "@/consts/types";
import { IPriceData } from "@/consts/interface";

const useRelayData = () => {
    const { getRelayStatus, fetchPrices } = useAPI();
    const { setSummaryData, setVolumeData, setOperators, setRelayer, setCounterParty, setConnection, setChannelStatus, setTransactionsData, setCurrentValue, relayer, counterParty } = useData();

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

    useEffect(() => {
        if (relayer === null || counterParty === null) return;
        const relayerName = relayer.name;
        const counterPartyname = counterParty.name;

        const denomMap: { [key: string]: string } = {};
        [relayer, counterParty].forEach(relayer => {
            denomMap[relayer.name.toLowerCase()] = relayer.denom;
        });

        Promise.all([fetchPrices({ ids: `${relayerName},${counterPartyname}` })])
            .then(([prices]) => {
                const transformedPrices: IPriceData = Object.entries(prices).reduce((acc, [key, value]) => {
                    const denom = denomMap[key];
                    if (denom) {
                        acc[denom] = value as any;
                    }
                    return acc;
                }, {} as IPriceData);

                setCurrentValue(transformedPrices);
            })
            .catch(() => { });
    }, [relayer, counterParty])

    return {
        getRelayStatus,
    };
};

export default useRelayData;
