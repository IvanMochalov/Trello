import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, useMediaQuery, FormControl, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useOutletContext } from 'react-router-dom';
import { TInitialData } from '../../type';

export const NewTask = () => {
  const [,,,handleSaveTask]: [TInitialData, () => void, (boardName: string) => void, (taskName: string) => void] = useOutletContext();
  const [open, setOpen] = React.useState(false);

  const [taskName, setTaskName] = React.useState('');

  const formTaskId = React.useId();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskName(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskName === '') {
      return;
    }
    handleSaveTask(taskName.trim());
    setTaskName('');
    setOpen(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Добавить список
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Название списка"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          >
            <form id={formTaskId} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl>
                <OutlinedInput placeholder="Список №1" onChange={handleChange}/>
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
            form={formTaskId}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}