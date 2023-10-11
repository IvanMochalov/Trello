import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, useMediaQuery, FormControl, OutlinedInput, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useOutletContext } from 'react-router-dom';
import { TInitialData } from '../../type';

export const NewBoard = () => {
  const [,,handleSaveBoard]: [TInitialData, () => void, (boardName: string) => void] = useOutletContext();
  const [open, setOpen] = React.useState(false);

  const [boardName, setBoardName] = React.useState('');

  const formBoardId = React.useId();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (boardName === '') {
      return;
    }
    handleSaveBoard(boardName.trim());
    setBoardName('');
    setOpen(false);
  }

  return (
    <>
      <Tooltip title="Create new Board" placement="right">
        <Button variant="contained" onClick={handleClickOpen} color='success' startIcon={<AddCircleTwoToneIcon />} sx={{width: '100%'}}>
          Новая доска
        </Button>
      </Tooltip>
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
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          >
            <form id={formBoardId} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl>
                <OutlinedInput placeholder="Доска №1" onChange={handleChange}/>
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
            form={formBoardId}
            autoFocus
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}