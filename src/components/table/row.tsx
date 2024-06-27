import { ReactNode } from "react";
import styled from "styled-components";

const TableRow = styled.tr`
    border-bottom: 1px solid #333;
`;

interface IProps {
    children: ReactNode;
}

const Row = ({ children }: IProps) => {
    return <TableRow>{children}</TableRow>;
};

export default Row;
