import CustomTable, { IHeader, TableCell, TableRow } from "@/components/table/customTable";
import { IOperatorState } from "@/consts/interface";
import { EXPLORER_URL } from "@/consts/urls";
import theme from "@/themes";
import { formatDateOrShowDistance, getUTCOffset, toUTCFormattedDate } from "@/utils/date";
import { convertCurrent } from "@/utils/number";
import { createTextEllipsis } from "@/utils/text";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmptyBox = styled.div`
    width: 100%;
    padding: 40px;
    border: 1px solid ${theme.colors.cardBorder};
    border-radius: 8px;
`;

const EmptyText = styled.div`
    font-size: 14px;
    color: ${theme.colors.descText};
`;

const AddressText = styled.div`
    font-size: 14px;
    color: ${theme.colors.linkText};
    cursor: pointer;

    &:hover {
        color: ${theme.colors.linkHoverText};
    }
`;

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

const TxsText = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    color: ${theme.colors.valueText};
`;

const HEADER: IHeader[] = [
    { id: "address", title: "Operator Address" },
    { id: "updatedAt", title: `Time (${getUTCOffset(new Date())})`, align: "right" },
];

interface IProps {
    data: IOperatorState[] | null;
}

const Operators = ({ data }: IProps) => {
    const [operatorsList, setOperatorsList] = useState<IOperatorState[]>([]);

    const handleList = (item: IOperatorState[]) => {
        setOperatorsList(item);
    };

    const OperatorItem = ({ item }: { item: IOperatorState }) => {
        const date = toUTCFormattedDate(item.updatedAt, "MMM do, yyyy");
        const time = toUTCFormattedDate(item.updatedAt, "HH:mm:ss");

        const distance = formatDateOrShowDistance(new Date(item.updatedAt));

        const onClickAddress = () => {
            window.open(`${EXPLORER_URL}/account/${item.address}`, "_blank");
        };

        return (
            <TableRow>
                <TableCell>
                    <AddressText onClick={onClickAddress}>{item.address}</AddressText>
                </TableCell>
                <TableCell>
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
            {data === null || data.length === 0 ? (
                <EmptyBox>
                    <EmptyText>{"empty"}</EmptyText>
                </EmptyBox>
            ) : (
                <CustomTable
                    headers={HEADER}
                    data={data}
                    dataSize={data.length}
                    handlePaginateData={handleList}
                    defaultRows={0}
                    rows={
                        <Fragment>
                            {operatorsList.map((item, rowIndex) => {
                                return <OperatorItem key={`${item.address}-${rowIndex}`} item={item} />;
                            })}
                        </Fragment>
                    }
                />
            )}
        </Container>
    );
};

export default Operators;
