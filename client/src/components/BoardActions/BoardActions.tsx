import React from 'react';
import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteButton } from '../DeleteButton';
import { TBoard, TStep, TTask } from '../../type';
import { EditButton } from '../EditButton';

interface IBoardActionsProps {
  item: TBoard | TTask | TStep
  type: string
  currParent?: TBoard | TTask
}

export const BoardActions = ({item, type, currParent}: IBoardActionsProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{minWidth: '40px'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <EditButton item={item} type={type} handleCloseMenu={handleClose}/>
        <DeleteButton currParent={currParent} item={item} type={type} handleCloseMenu={handleClose}/>
      </Menu>
    </>
  )
}