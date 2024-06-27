import { ITransaction } from "@/consts/interface";
import React, { useState } from "react";

interface ITxContext {
    acknowledgement: ITransaction[] | null;
    received: ITransaction[] | null;
    transfer: ITransaction[] | null;
    setAcknowledgement: (value: ITransaction[]) => void;
    setReceived: (value: ITransaction[]) => void;
    setTransfer: (value: ITransaction[]) => void;
}

export const TxContext = React.createContext<ITxContext | null>(null);

const TxProvider = ({ children }: any) => {
    const [acknowledgement, setAcknowledgement] = useState<ITransaction[] | null>(null);
    const [received, setReceived] = useState<ITransaction[] | null>(null);
    const [transfer, setTransfer] = useState<ITransaction[] | null>(null);

    return <TxContext.Provider value={{ acknowledgement, received, transfer, setAcknowledgement, setReceived, setTransfer }}>{children}</TxContext.Provider>;
};

export default TxProvider;
