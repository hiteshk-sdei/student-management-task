import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationModal({
    openModal,
    closeModal
}) {
    return (
        <Dialog
            fullWidth={true}
            open={openModal ? true : undefined}
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>closeModal(false)}>Disagree</Button>
                <Button onClick={()=>closeModal(openModal)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}