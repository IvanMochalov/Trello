import React from 'react';
import { Button } from '@mui/material';
import { TTask } from '../../type';

interface ISortButtonProps {
  stepIds: string[]
  currTask: TTask
  handleClick: (ids:  string[], currentParent: TTask, dir: boolean) => void
}

export  const SortButton = ({  stepIds, currTask, handleClick }: ISortButtonProps) => {
  const [sortDirection, setSortDirection] = React.useState(true);

  const handleSort = () => {
    setSortDirection((prev) => !prev);
    handleClick(stepIds, currTask, sortDirection)
  }
  
  return (
    <Button
      onClick={handleSort}
      sx={{
        minWidth: '40px',
        height: '20px',
        color: 'gray',
        borderRadius: '10px',
        fontWeight: '400',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      {sortDirection ? '↑А-Я' : '↓Я-А'}
    </Button>
  )
}