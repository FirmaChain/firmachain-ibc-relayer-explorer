import { TxContext } from "@/context/txProvider";
import { useContext } from "react";

const useTxData = () => {
    const context = useContext(TxContext);

    if (!context) {
        throw new Error("useTxData must be used within a TxProvider");
    }

    return {
        acknowledgement: context.acknowledgement,
        received: context.received,
        transfer: context.transfer,
        setAcknowledgement: context.setAcknowledgement,
        setReceived: context.setReceived,
        setTransfer: context.setTransfer,
    };
};

export default useTxData;
