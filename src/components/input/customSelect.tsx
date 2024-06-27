import { IC_DOWN_ARROW } from "@/consts/images";
import theme from "@/themes";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSelect = styled(Select)`
    & .MuiSelect-select {
        padding: 5px 10px !important;
        background-color: ${theme.colors.contentBackground};
        color: ${theme.colors.valueText};
        font-size: 12px;
    }
    & .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.cardBorder} !important;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.cardBorder} !important;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${theme.colors.cardBorder} !important;
    }

    @media only screen and (max-width: 768px) {
       & .MuiSelect-select {
            padding: 3px 10px !important;
            font-size: 10px;
        }
    }
`;

const CustomMenuItem = styled(MenuItem)`
   
    &.MuiMenuItem-root {
        background-color: ${theme.colors.boxBackground} !important;
        color: ${theme.colors.titleText} !important;
        font-size: 14px;
    }
    &:hover {
        background-color: ${theme.colors.contentBackground} !important;
        color: ${theme.colors.valueText} !important;
        font-size: 14px;
    }
    &.Mui-selected {
        background-color: ${theme.colors.contentBackground} !important;
        color: ${theme.colors.valueText} !important;
        font-size: 14px;
    }


    @media only screen and (max-width: 768px) {
         &.MuiMenuItem-root {
            font-size: 10px;
        }
        &:hover {
            font-size: 10px;
        }
        &.Mui-selected {
            font-size: 10px;
        }
     }
`;

const ArrowDropDownWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
        padding: 0 5px;
    }
`

const ArrowDropDownImg = styled.img`
    width: 15px;
    height: 15px;
    object-fit: contain;
`


interface IProps {
    value: number | string;
    setValue: (value: number | string) => void;
    menuItems: string[] | number[]
}

const CustomSelect = ({ value, setValue, menuItems }: IProps) => {

    const [openSelect, setOpenSelect] = useState<boolean>(false);

    const handleIconClick = () => {
        setOpenSelect((prevOpen) => !prevOpen);
    };


    const handleChangeSelect = (event: SelectChangeEvent<any>) => {
        setValue(Number(event.target.value));
    };


    const handleScroll = () => {
        if (openSelect) {
            setOpenSelect(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [openSelect]);

    return (
        <StyledSelect
            value={value.toString()}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChangeSelect}
            IconComponent={() => <ArrowDropDownWrap onClick={handleIconClick}>
                <ArrowDropDownImg src={IC_DOWN_ARROW} alt={'dropdown'} />
            </ArrowDropDownWrap>
            }
            open={openSelect}
            onClose={() => setOpenSelect(false)}
            onOpen={() => setOpenSelect(true)}
            MenuProps={{
                PaperProps: {
                    sx: {
                        bgcolor: `${theme.colors.boxBackground} !important`,
                        color: `${theme.colors.valueText} !important`,
                        border: `1px solid ${theme.colors.cardBorder} !important`,
                    },
                },
                disableScrollLock: true,
            }}
        >
            {menuItems.map((value, index) => (
                <CustomMenuItem key={index} value={index}>{value}</CustomMenuItem>
            ))}
        </StyledSelect>
    )
}

export default CustomSelect;