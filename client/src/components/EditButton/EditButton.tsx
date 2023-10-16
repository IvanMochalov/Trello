import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TBoard, TOutletContext, TStep, TTask } from '../../type';
import { useOutletContext } from 'react-router-dom';

interface IEditButtonProps {
  item: TBoard | TTask | TStep
  type: string
  handleCloseMenu: () => void
}

export const EditButton = ({ item, type, handleCloseMenu }: IEditButtonProps) => {
  const { handlers: { itemEdit } } = useOutletContext<TOutletContext>();
  const [open, setOpen] = React.useState(false);
  const [itemName, setItemName] = React.useState(item.title);

  const formEditId = React.useId();

  React.useEffect(() => {
    setItemName(item.title)
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
    setItemName(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (itemName === '') {
      return;
    }
    itemEdit(item, itemName.trim())
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
            <form id={formEditId} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl sx={{width: '100%'}}>
                <OutlinedInput value={itemName} placeholder="Доска №1" onChange={handleChange}/>
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
            form={formEditId}
            autoFocus
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}