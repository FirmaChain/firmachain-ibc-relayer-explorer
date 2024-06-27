import styled from "styled-components";
import { IHeader } from "./customTable";
import theme from "@/themes";

const TableHeader = styled.thead`
    background-color: ${theme.colors.boxBackground};
`;

const TableRow = styled.tr`
    border-bottom: 1px solid ${theme.colors.cardBorder};
`;

const TableHeaderCell = styled.th`
    padding: 15px;
    font-size: 14px;
    text-align: left;
    font-weight: 400;
    color: ${theme.colors.titleText};
    white-space: nowrap;
`;

interface IProps {
    headers: IHeader[];
}

const Header = ({ headers }: IProps) => {
    return (
        <TableHeader>
            <TableRow>
                {headers.map((header, index) => {
                    if (header.custom === undefined) {
                        return (
                            <TableHeaderCell key={`${header.id}-${index}`} style={{ textAlign: header.align === undefined ? "left" : header.align }}>
                                {header.title}
                            </TableHeaderCell>
                        );
                    } else {
                        return header.custom;
                    }
                })}
            </TableRow>
        </TableHeader>
    );
};

export default Header;
