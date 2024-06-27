
import CircularProgress from '@mui/material/CircularProgress';
import { Fragment } from 'react/jsx-runtime';

interface IProps {
    size?: number;
}

const CircleProgress = ({ size = 14 }: IProps) => {
    return (
        <Fragment>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="loading_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#02E191" />
                        <stop offset="100%" stopColor="#13E6D9" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#loading_gradient)' } }} size={size} />
        </Fragment>
    );
}

export default CircleProgress;