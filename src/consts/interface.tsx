export interface IRelayerState {
    name: string;
    chainId: string;
    denom: string;
    ticker: string;
    channelId: string;
}

export interface ISummaryState {
    relayer: IRelayerState;
    counterParty: IRelayerState;
    createdAt: string;
    state: string;
    clientID: string;
}

export interface IOperatorState {
    address: string;
    txs: string;
    updatedAt: string;
}

export interface ITransactionsState {
    day: number;
    week: number;
    month: number;
}

export interface IVolumesState {
    day: IVolumeState;
    week: IVolumeState;
    month: IVolumeState;
}

export interface IVolumeState {
    totalAcknowledgement: IAmountState[]
    totalReceived: IAmountState[]
    totalSend: IAmountState[]
}

export interface IAmountState {
    denom: string;
    amount: string
}

export interface IVolumeGraph {
    id: string;
    label: string;
    value: number;
    color: string;
}

export interface IOperatorState {
    address: string;
    txs: string;
    updatedAt: string;
}

export interface IChainState {
    name: string;
    chainId: string;
    denom: string;
    ticker: string;
    channelId: string;
    icon: string;
}

export interface ITransactions {
    acknowledgement: ITransaction[];
    received: ITransaction[];
    transfer: ITransaction[];
}

export interface ITransaction {
    height: number;
    transactionHash: string;
    index: number;
    type: string;
    fee: {
        payer: string;
        amount: { amount: string; denom: string }[];
        granter: string;
        gasLimit: string;
    };
    value: {
        amount: { amount: string; denom: string }[];
        signer?: string;
        sourceChannel?: string;
        destinationChannel?: string;
        receiver?: string;
        sender?: string;
    };
    success: boolean;
    timestamp: string;
}


export interface IPriceData {
    [key: string]: {
        usd: number;
    };
}
