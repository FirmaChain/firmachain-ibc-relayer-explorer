import theme from "@/themes";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div<{ $border: boolean }>`
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;

    ${({ $border }) => ($border ? `border: 1px solid ${theme.colors.cardBorder}` : `border: none`)};

    @media only screen and (max-width: 768px) {
        padding: 15px;
    }
`;

interface IProps {
    fullWidth?: boolean;
    backgroundColor: string;
    border?: boolean;
    children: ReactNode;
}

const DefaultCard = ({ fullWidth = false, backgroundColor, border = false, children }: IProps) => {
    return (
        <Container $border={border} style={{ background: backgroundColor, width: fullWidth ? "100%" : "auto" }}>
            {children}
        </Container>
    );
};

export default DefaultCard;
