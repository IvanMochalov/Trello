import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TBoard, TInitialData } from '../../type'
import { useOutletContext } from 'react-router-dom'

interface IDeleteButton {
  // handleClick: () => void
  board: TBoard
}

export const DeleteButton = ({  board }: IDeleteButton) => {
  const [,,,handleDeleteBoard]: [TInitialData,() => void ,() => void, (boardId: string) => void] = useOutletContext();
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen} tabIndex={0}>
        <DeleteIcon sx={{ marginRight: '5px', color: 'crimson' }}/>
        Delete
      </MenuItem>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Удалить доску '${board.title}' ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={() => {handleDeleteBoard(board.id); handleClose()}} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}