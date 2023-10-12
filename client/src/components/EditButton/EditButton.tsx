import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const EditButton = () => {
  return (
    <Tooltip title="Edit" placement="top">
      <IconButton sx={{ marginRight: '5px', color: 'darkgreen'}}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}