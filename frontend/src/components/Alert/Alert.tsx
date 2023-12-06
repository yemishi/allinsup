import { forwardRef, useState, ReactNode, SetStateAction, Dispatch } from 'react'
import { Snackbar, SnackbarCloseReason, Alert as AlertBar, AlertProps } from '@mui/material';

interface PropsType {
    children: ReactNode
    props: AlertProps,
    handlerAlert: {
        openAlert: boolean,
        setOpenAlert: Dispatch<SetStateAction<boolean>>
    }
}

const AlertBarWrapper = forwardRef<HTMLDivElement, AlertProps>(
    function AlertBarWrapper(props, ref) {
        return <AlertBar elevation={6} ref={ref} {...props} />
    }
)

export default function Alert({ props, children, handlerAlert: { openAlert, setOpenAlert } }: PropsType) {

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") return;
        setOpenAlert(false);
    };
    return (
        <div>
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
                <AlertBarWrapper onClose={handleClose} {...props}>
                    {children}
                </AlertBarWrapper>
            </Snackbar>

        </div>
    )
}