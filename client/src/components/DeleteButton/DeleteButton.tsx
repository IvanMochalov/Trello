import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteButton = () => {
  return (
    <Tooltip title="Delete" placement="top">
      <IconButton sx={{ marginRight: '5px' }}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}