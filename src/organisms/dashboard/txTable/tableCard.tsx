import CustomTable, { IHeader, TableCell, TableRow } from "@/components/table/customTable";
import { EXPLORER_URL } from "@/consts/urls";
import { TRANSACTION_TYPE_MODEL } from "@/consts/common";
import { ITransaction } from "@/consts/interface";
import { formatDateOrShowDistance, getUTCOffset, toUTCFormattedDate } from "@/utils/date";
import { convertCurrent, convertNumber } from "@/utils/number";
import { createTextEllipsis } from "@/utils/text";
import { Fragment, useMemo, useState } from "react";
import { FirmaUtil } from "@firmachain/firma-js";
import { CONVERT_IBC_TO_OSMO_VALUE } from "@/config";
import theme from "@/themes";
import styled from "styled-components";
import useData from "@/hooks/useData";
import CircleProgress from "@/components/loading/circleProgress";
import CustomTooltip from "@/components/tooltip/customTooltip";
import { IC_TX_FAILED, IC_TX_SUCCESS } from "@/consts/images";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
`;

const TitleText = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${theme.colors.titleText}80;
`;

const HashText = styled.div`
    font-size: 14px;
    color: ${theme.colors.linkText};
    cursor: pointer;

    &:hover {
        color: ${theme.colors.linkHoverText};
    }
`;

const HeightText = styled.div`
    font-size: 14px;
    color: ${theme.colors.linkText};
    cursor: pointer;

    &:hover {
        color: ${theme.colors.linkHoverText};
    }
`;

const AmountWrap = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
`;

const AmountText = styled.div`
    font-size: 14px;
    color: ${theme.colors.valueText};
`;

const SymbolText = styled.div`
    font-size: 14px;
    color: ${theme.colors.descText};
`;

const ResultWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
`

const ResultText = styled.div<{ $success: boolean }>`
    font-size: 14px;
    color: ${theme.colors.descText};
`;

const ResultIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
`

const TimeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 5px;
`;

const TimeTitleText = styled.div`
    font-size: 14px;
    color: ${theme.colors.valueText};
`;

const TimeDescText = styled.div`
    font-size: 12px;
    color: ${theme.colors.descText};
`;

const MessageText = styled.div<{ $color: string }>`
    width: fit-content;
    font-size: 14px;
    padding: 5px 10px;
    color: ${({ $color }) => $color};
    background: ${({ $color }) => $color}30;
    border-radius: 6px;
    overflow: hidden;
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
    title: string;
    data: ITransaction[] | null;
}

const HEADER: IHeader[] = [
    { id: "txHash", title: "Tx Hash" },
    { id: "result", title: "Result" },
    { id: "message", title: "Message" },
    { id: "height", title: "Height" },
    { id: "amount", title: "Amount" },
    { id: "fee", title: "Fee" },
    { id: "time", title: `Time (${getUTCOffset(new Date())})`, align: "right" },
];

const TableCard = ({ title, data }: IProps) => {
    const { relayer, counterParty } = useData();
    const [pageData, setPageData] = useState<ITransaction[]>([]);

    const handleList = (list: ITransaction[]) => {
        setPageData(list);
    };

    const TxItem = ({ item }: { item: ITransaction }) => {
        const date = toUTCFormattedDate(item.timestamp, "MMM do, yyyy");
        const time = toUTCFormattedDate(item.timestamp, "HH:mm:ss");

        const distance = formatDateOrShowDistance(new Date(item.timestamp));

        const amount = {
            origin: convertCurrent(FirmaUtil.getFCTStringFromUFCTStr(item.value.amount[0].amount)),
            value: convertCurrent(convertNumber(FirmaUtil.getFCTStringFromUFCTStr(item.value.amount[0].amount)).toFixed(2))
        }
        const fee = {
            origin: convertCurrent(FirmaUtil.getFCTStringFromUFCTStr(item.fee.amount[0].amount)),
            value: convertCurrent(convertNumber(FirmaUtil.getFCTStringFromUFCTStr(item.fee.amount[0].amount)).toFixed(2))
        }

        const getSymbol = ({ denom }: { denom: string }) => {
            if (relayer === null || counterParty === null) return '';
            const _denom = denom.split("/");
            let lastPart = _denom[_denom.length - 1];
            if (lastPart.toLowerCase() === CONVERT_IBC_TO_OSMO_VALUE.toLowerCase()) lastPart = "OSMO"

            const chains = [relayer, counterParty];
            const _symbol = chains.find((value) => value.denom === _denom[_denom.length - 1]);

            return _symbol === undefined ? '' : _symbol.ticker;
        }

        const onClickHash = () => {
            window.open(`${EXPLORER_URL}/transactions/${item.transactionHash}`, "_blank");
        };

        const onClickBlock = () => {
            window.open(`${EXPLORER_URL}/blocks/${item.height}`, "_blank");
        };

        const convertMsg = useMemo(() => {
            let result = TRANSACTION_TYPE_MODEL[item.type];
            if (result === undefined || result === null) {
                const value = item.type.replace("Msg", "").split(".");
                result = {
                    tagTheme: theme.colors.messageDefault,
                    tagDisplay: value.pop(),
                };
            }
            return result;
        }, [item]);

        return (
            <TableRow>
                <TableCell style={{ width: '250px' }}>
                    <HashText onClick={onClickHash}>{createTextEllipsis(item.transactionHash, 10, 10)}</HashText>
                </TableCell>
                <TableCell style={{ width: '130px' }}>
                    <ResultWrap>
                        <ResultIcon src={Boolean(item.success) ? IC_TX_SUCCESS : IC_TX_FAILED} alt={'transaction result'} />
                        <ResultText $success={item.success}>{item.success ? "Success" : "Failed"}</ResultText>
                    </ResultWrap>
                </TableCell>
                <TableCell style={{ width: '180px' }}>
                    <MessageText $color={convertMsg.tagTheme}>{convertMsg.tagDisplay}</MessageText>
                </TableCell>
                <TableCell style={{ width: '150px' }}>
                    <HeightText onClick={onClickBlock}>{convertCurrent(item.height)}</HeightText>
                </TableCell>
                <TableCell style={{ width: '150px' }}>
                    <CustomTooltip title={`${amount.origin} ${getSymbol({ denom: item.value.amount[0].denom })}`} >
                        <AmountWrap>
                            <AmountText>{amount.value}</AmountText>
                            <SymbolText>{getSymbol({ denom: item.value.amount[0].denom })}</SymbolText>
                        </AmountWrap>
                    </CustomTooltip>
                </TableCell>
                <TableCell style={{ width: '150px' }}>
                    <CustomTooltip title={`${fee.origin} ${getSymbol({ denom: item.fee.amount[0].denom })}`}>
                        <AmountWrap>
                            <AmountText>{fee.value}</AmountText>
                            <SymbolText>{getSymbol({ denom: item.fee.amount[0].denom })}</SymbolText>
                        </AmountWrap>
                    </CustomTooltip>
                </TableCell>
                <TableCell style={{ width: '180px' }}>
                    <TimeBox>
                        <TimeTitleText>{date}</TimeTitleText>
                        <TimeDescText>{`${time} (${distance})`}</TimeDescText>
                    </TimeBox>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Container>
            <TitleText>{title}</TitleText>
            {data === null ?
                <EmptyMessageText>{'Loading'}<CircleProgress /></EmptyMessageText>
                :
                data.length > 0 ?
                    <CustomTable
                        headers={HEADER}
                        data={data}
                        dataSize={data.length}
                        handlePaginateData={handleList}
                        defaultRows={0}
                        rows={
                            <Fragment>
                                {pageData.map((item, rowIndex) => {
                                    return <TxItem key={`${item.transactionHash}-${rowIndex}`} item={item} />;
                                })}
                            </Fragment>
                        }
                    />
                    :
                    <EmptyMessageText>{'No transaction data.'}</EmptyMessageText>
            }
        </Container>
    );
};

export default TableCard;
