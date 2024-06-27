import DefaultCard from "@/components/card/defaultCard";
import theme from "@/themes";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const TitleText = styled.div`
    width: 100%;
    font-size:16px
    font-weight: 500;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${theme.colors.titleText};
    white-space: nowrap;
    padding: 5px 0;

    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`;

const ValueBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 5px;
    padding: 5px 0;
`;

const ValueWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
`;

const SubTitltText = styled.div`
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;

    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`;

const ValueText = styled.div`
    font-size: 26px;
    font-weight: 500;
    color: ${theme.colors.valueText};
    white-space: nowrap;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`;

const DescText = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${theme.colors.descText};
    white-space: nowrap;

    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`;

interface IProps {
    title: string;
    subtitle?: string | null;
    value: string | number;
    desc?: string | null;
    background: string;
}

const Card = ({ title, subtitle = null, value, desc = null, background }: IProps) => {
    return (
        <DefaultCard backgroundColor={background} fullWidth={true}>
            <Container>
                <TitleBox>
                    <TitleText>{title}</TitleText>
                </TitleBox>
                <ValueBox>
                    <SubTitltText style={{ display: subtitle ? "block" : "none" }}>{subtitle}</SubTitltText>
                    <ValueWrap>
                        <ValueText>{value}</ValueText>
                        <DescText style={{ display: desc ? "block" : "none" }}>{desc}</DescText>
                    </ValueWrap>
                </ValueBox>
            </Container>
        </DefaultCard>
    );
};

export default Card;
