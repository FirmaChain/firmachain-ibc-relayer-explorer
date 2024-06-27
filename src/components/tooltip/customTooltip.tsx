import { Tooltip, useMediaQuery } from "@mui/material";
import { MouseEvent, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: fit-content;
    height: fit-content;
`

interface IProps {
    children: ReactElement<any, any>;
    title: string | number;
}

const CustomTooltip = ({ title, children }: IProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const isMobile = useMediaQuery('(hover: none) and (pointer: coarse)');
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTooltipOpen = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [open]);

    return (
        <Tooltip title={title} placement={"bottom"} open={open}
            onClose={handleTooltipClose}
            disableFocusListener
            disableTouchListener
            {...(isMobile
                ? {
                    disableHoverListener: true,
                    onClick: handleTooltipOpen,
                }
                : {
                    onMouseEnter: handleTooltipOpen,
                    onMouseLeave: handleTooltipClose,
                })}
        >
            <Container ref={containerRef} onClick={isMobile ? handleTooltipOpen : undefined}>
                {children}
            </Container>
        </Tooltip>

    )
}

export default CustomTooltip;