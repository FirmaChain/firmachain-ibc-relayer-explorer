import useAPI from "@/api/api";
import useTxData from "./useTxData";
import { useEffect } from "react";
import { ITransaction } from "@/consts/interface";

const useRelayTxData = () => {
    const { getRelayTxHistory } = useAPI();
    const { setAcknowledgement, setReceived, setTransfer } = useTxData();

    useEffect(() => {
        Promise.all([getRelayTxHistory()])
            .then(([relayTxHistory]) => {
                setAcknowledgement(relayTxHistory.acknowledgement as ITransaction[]);
                setReceived(relayTxHistory.received as ITransaction[]);
                setTransfer(relayTxHistory.transfer as ITransaction[]);
            })
            .catch(() => { });
    }, []);

    return {
        getRelayTxHistory,
    };
};

export default useRelayTxData;
