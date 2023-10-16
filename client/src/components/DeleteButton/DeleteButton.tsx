import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TBoard, TOutletContext, TStep, TTask } from '../../type'
import { useOutletContext } from 'react-router-dom'

interface IDeleteButton {
  item: TBoard | TTask | TStep
  type: string
  currParent?: TBoard | TTask
  handleCloseMenu: () => void
}

export const DeleteButton = ({ item, type, currParent, handleCloseMenu }: IDeleteButton) => {
  const { handlers: { itemDelete } } = useOutletContext<TOutletContext>();
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseMenu()
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
          {`Удаление ${type} '${item.title}' `}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={() => {itemDelete(item, currParent); handleClose()}} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}