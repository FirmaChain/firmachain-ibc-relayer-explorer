import { IC_BACK_ACTIVE, IC_BACK_DISABLE, IC_BACK_DOUBLE_ACTIVE, IC_BACK_DOUBLE_DISABLE, IC_FORTH_ACTIVE, IC_FORTH_DISABLE, IC_FORTH_DOUBLE_ACTIVE, IC_FORTH_DOUBLE_DISABLE } from "@/consts/images";
import theme from "@/themes";
import { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import CustomSelect from "../input/customSelect";

const selectItems = [5, 10, 15, 20, 50];

interface IProps {
    totalDataLength: number;
    totalPages: number;
    handlePage: (page: number) => void;
    handleRowsPerPage: (rows: number) => void;
    defaultRows?: number;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 20px;
    width: 100%;
    background-color: transparent;
`;

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Label = styled.span`
    color: ${theme.colors.descText};
    font-size: 12px;
`;

const IconButton = styled.img<{ $disabled: boolean }>`
    cursor: ${({ $disabled }) => ($disabled ? "auto" : "pointer")};
    width: 16px;
    height: 16px;
`;

const PageButton = styled.button<{ $isActive: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ $isActive }) => ($isActive ? theme.colors.valueText : theme.colors.descText)};
    padding: 5px;
    font-weight: ${({ $isActive }) => ($isActive ? "500" : "normal")};
    font-size: 12px;
`;

const Pagination = ({ totalDataLength, totalPages, handlePage, handleRowsPerPage, defaultRows = 1 }: IProps) => {
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const [rowsPerPageIndex, setRowsPerPageIndex] = useState(defaultRows);
    const [maxVisiblePages, setMaxVisiblePages] = useState<number>(5);

    const handleChangeSelect = (value: string | number) => {
        setRowsPerPageIndex(Number(value));
    };

    const handleOnClickChangePage = useCallback(
        (increase: boolean) => {
            const _page = increase ? selectedPage + 1 : selectedPage - 1;
            if (_page >= 0 && _page < totalPages) {
                setSelectedPage(_page);
            }
        },
        [selectedPage, totalPages]
    );

    const handlePageClick = (page: number) => {
        setSelectedPage(page);
    };

    const handleFirstPage = () => {
        setSelectedPage(0);
    };

    const handleLastPage = () => {
        setSelectedPage(totalPages - 1);
    };

    useEffect(() => {
        handleRowsPerPage(selectItems[rowsPerPageIndex]);
    }, [rowsPerPageIndex, handleRowsPerPage]);

    useEffect(() => {
        handlePage(selectedPage);
    }, [selectedPage, handlePage]);

    useEffect(() => {
        if (totalDataLength > 0 && Math.ceil(totalDataLength / selectItems[rowsPerPageIndex]) < selectedPage + 1) {
            const lastPage = Math.ceil(totalDataLength / selectItems[rowsPerPageIndex]) - 1;
            setSelectedPage(lastPage);
        }
    }, [rowsPerPageIndex, totalDataLength, selectedPage]);

    useEffect(() => {
        const handleResize = () => {
            setMaxVisiblePages(window.innerWidth <= 768 ? 3 : 5);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(0, selectedPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages);

        if (endPage - startPage < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages);
        }

        for (let i = startPage; i < endPage; i++) {
            pages.push(
                <PageButton key={i} $isActive={i === selectedPage} onClick={() => handlePageClick(i)}>
                    {i + 1}
                </PageButton>
            );
        }
        return pages;
    };

    return (
        <Container>
            <FlexRow>
                <Label>{"Size"}</Label>
                <CustomSelect value={rowsPerPageIndex} setValue={handleChangeSelect} menuItems={selectItems} />
            </FlexRow>
            <FlexRow>

                <IconButton onClick={handleFirstPage} $disabled={selectedPage === 0} src={selectedPage === 0 ? IC_BACK_DOUBLE_DISABLE : IC_BACK_DOUBLE_ACTIVE} alt={"Back"} />
                <IconButton onClick={() => handleOnClickChangePage(false)} $disabled={selectedPage === 0} src={selectedPage === 0 ? IC_BACK_DISABLE : IC_BACK_ACTIVE} alt={"Back"} />
                {renderPageNumbers()}
                <IconButton onClick={() => handleOnClickChangePage(true)} $disabled={selectedPage + 1 >= totalPages} src={selectedPage + 1 >= totalPages ? IC_FORTH_DISABLE : IC_FORTH_ACTIVE} alt={"Forth"} />
                <IconButton onClick={handleLastPage} $disabled={selectedPage + 1 >= totalPages} src={selectedPage + 1 >= totalPages ? IC_FORTH_DOUBLE_DISABLE : IC_FORTH_DOUBLE_ACTIVE} alt={"Forth"} />
            </FlexRow>
        </Container>
    );
};

export default Pagination;
