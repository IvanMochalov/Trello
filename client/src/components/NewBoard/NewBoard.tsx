import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

interface INewBoardProps {
  onSaveButtonClick: (name: string) => void;
}

export const NewBoard = ({ onSaveButtonClick }: INewBoardProps) => {
  const [open, setOpen] = React.useState(false);
  const [boardName, setBoardName] = React.useState('Моя доска');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBoardName(event.target.value)
  }

  // const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
  //   event.preventDefault()
  //   console.log(event)
  // }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} color='success' startIcon={<AddCircleTwoToneIcon />} sx={{width: '100%'}}>
        Новая доска
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Название доски"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus={true}
              required
              id="outlined-required"
              label="Моя доска"
              placeholder="Доска №1"
              onChange={handleChange}
              // onSubmit={handleSubmit}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={() => {onSaveButtonClick(boardName); setOpen(false);}} autoFocus>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}