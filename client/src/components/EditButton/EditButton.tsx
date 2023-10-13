import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TBoard, TInitialData } from '../../type';
import { useOutletContext } from 'react-router-dom';

interface IEditButtonProps {
  board: TBoard
  handleCloseMenu: () => void
}

export const EditButton = ({ board, handleCloseMenu }: IEditButtonProps) => {
  const [,,,,handleEditBoard]: [TInitialData,() => void ,() => void, () => void, (itemId: string, newItemName: string) => void] = useOutletContext();
  const [open, setOpen] = React.useState(false);
  const [boardName, setBoardName] = React.useState(board.title);

  const formEditBoardId = React.useId();

  React.useEffect(() => {
    setBoardName(board.title)
  }, [board.title])

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseMenu()
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBoardName(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (boardName === '') {
      return;
    }
    handleEditBoard(board.id, boardName.trim())
    setOpen(false);
    handleCloseMenu()
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen} tabIndex={0}>
        <EditIcon  sx={{ marginRight: '5px', color: 'darkgreen' }}/>
        Edit
      </MenuItem>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{maxWidth: '100%', whiteSpace: 'normal'}}>
          {`Редактирование доски '${board.title}'`}
        </DialogTitle>
        <DialogContent>
          <Box
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          >
            <form id={formEditBoardId} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl sx={{width: '100%'}}>
                <OutlinedInput value={boardName} placeholder="Доска №1" onChange={handleChange}/>
              </FormControl>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button
            type="submit"
            form={formEditBoardId}
            autoFocus
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}