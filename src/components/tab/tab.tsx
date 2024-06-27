import theme from "@/themes";
import styled from "styled-components";

const TabBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`;

const TabText = styled.div<{ $selected: boolean }>`
    font-size: 16px;
    padding: 20px;
    font-weight: 500;
    ${({ $selected }) =>
        $selected
            ? `
        color: ${theme.colors.valueText};
    `
            : `
        color: ${theme.colors.valueText}50;
    `}
    transition: all 0.2s ease;


    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

const TabAccent = styled.div<{ $selected: boolean }>`
    width: 100%;
    height: 2px;
    ${({ $selected }) =>
        $selected
            ? `
        background: ${theme.colors.valueText};
    `
            : `
        background: transparent;
    `}
    transition: all 0.2s ease;
`;

interface IProps {
    title: string;
    active: boolean;
    onClick: () => void;
}

const Tab = ({ title, active, onClick }: IProps) => {
    return (
        <TabBox onClick={onClick}>
            <TabText $selected={active}>{title}</TabText>
            <TabAccent $selected={active} />
        </TabBox>
    );
};

export default Tab;
