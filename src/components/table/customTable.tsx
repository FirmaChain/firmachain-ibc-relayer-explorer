import styled from "styled-components";
import Header from "./header";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { convertNumber } from "@/utils/number";
import Pagination from "./pagination";
import theme from "@/themes";

const Container = styled.div`
    width: 100%;
    background-color: ${theme.colors.contentBackground};
    border: 1px solid ${theme.colors.cardBorder};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    overflow: hidden;
`;

const Box = styled.div`
    width: 100%;
    overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: ${theme.colors.contentBackground};
    border-radius: 8px 8px 0 0;
    color: #fff;
    overflow: auto;
`;

export const TableRow = styled.tr`
    width: 100%;
    border-bottom: 1px solid ${theme.colors.cardBorder};
`;

export const TableCell = styled.td`
    padding: 15px;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 16px;

    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

export interface IHeader {
    id: string;
    title: string;
    align?: "left" | "right" | "center";
    custom?: ReactNode;
}

interface IProps {
    headers: IHeader[];
    data: any[];
    dataSize: number;
    rows: ReactNode;
    pagination?: boolean;
    defaultRows?: number;
    handlePaginateData: (list: any[]) => void;
}

const CustomTable = ({ headers, data, dataSize, rows, pagination = data.length > 0, defaultRows = 1, handlePaginateData }: IProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = useMemo(() => {
        if (dataSize === 0) return 0;
        return Math.ceil(dataSize / convertNumber(rowsPerPage));
    }, [dataSize, rowsPerPage]);

    const handlePage = (page: number) => {
        setPage(page);
    };

    const handleRowsPerPage = (rows: number) => {
        setRowsPerPage(rows);
    };

    const memoizedRowsPerPage = useMemo(() => convertNumber(rowsPerPage), [rowsPerPage]);

    useEffect(() => {
        const nowPageData = data.slice(page * memoizedRowsPerPage, page * memoizedRowsPerPage + memoizedRowsPerPage);
        handlePaginateData(nowPageData);
    }, [data, page, memoizedRowsPerPage]);

    return (
        <Container>
            <Box>
                <Table>
                    <Header headers={headers} />
                    <tbody>{rows}</tbody>
                </Table>
            </Box>
            {pagination ? (
                <Pagination totalDataLength={dataSize} totalPages={totalPages} handlePage={handlePage} handleRowsPerPage={handleRowsPerPage} defaultRows={defaultRows} />
            ) : (
                <div style={{ width: "100%" }} />
            )}
        </Container>
    );
};

export default CustomTable;
