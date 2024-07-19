import { enqueueSnackbar, useSnackbar } from "notistack"

interface IProps {
    value: string | number;
    variant: 'default' | 'error' | 'success' | 'warning' | 'info';
}

const Toast = ({ value, variant }: IProps) => {
    enqueueSnackbar(value, {
        variant: variant,
        autoHideDuration: 3000
    });
}

export default Toast;