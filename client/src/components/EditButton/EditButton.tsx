import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TBoard, TInitialData, TStep, TTask } from '../../type';
import { useOutletContext } from 'react-router-dom';

interface IEditButtonProps {
  item: TBoard | TTask | TStep
  type: string
  handleCloseMenu: () => void
}

export const EditButton = ({ item, type, handleCloseMenu }: IEditButtonProps) => {
  const [,,,,handleEditBoard]: [TInitialData,() => void ,() => void, () => void, (itemId: string, newItemName: string) => void] = useOutletContext();
  const [open, setOpen] = React.useState(false);
  const [boardName, setBoardName] = React.useState(item.title);

  const formEditBoardId = React.useId();

  React.useEffect(() => {
    setBoardName(item.title)
  }, [item.title])

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
    handleEditBoard(item.id, boardName.trim())
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
          {`Редактирование ${type} '${item.title}'`}
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