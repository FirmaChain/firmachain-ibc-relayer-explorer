import theme from "@/themes";
import styled from "styled-components";

export const Layout = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    background: ${theme.colors.mainBackground};
`;

export const MainContent = styled.div`
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.mainBackground};
`;

export const ContentsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: 30px;

    background-color: ${({ theme }) => theme.colors.contentBackground};
    overflow: auto !important;

    & > div {
        max-width: 1400px;
    }

    @media only screen and (max-width: 960px) {
        padding: 30px 20px;
    }
`;
