import theme from "@/themes";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid ${theme.colors.cardBorder};
`;

interface IProps {
    fullWidth?: boolean;
    children: ReactNode;
}

const TabContainer = ({ fullWidth = true, children }: IProps) => {
    return <Container style={{ width: fullWidth ? "100%" : "auto" }}>{children}</Container>;
};

export default TabContainer;
