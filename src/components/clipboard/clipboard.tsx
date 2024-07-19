import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { IC_COPY } from "@/consts/images";
import Toast from "../toast/toast";

const CopyIcon = styled.img`
    width: 22px;
    height: 22px;
    object-fit: contain;
    cursor: pointer;
`

interface IProps {
    value: string | number;
}

const ClipBoard = ({ value }: IProps) => {

    return (
        <CopyToClipboard text={value.toString()} onCopy={() => Toast({ value: `Successfully copied to clipboard`, variant: 'success' })}>
            <CopyIcon src={IC_COPY} alt={'copy'} />
        </CopyToClipboard>
    )
}

export default ClipBoard;