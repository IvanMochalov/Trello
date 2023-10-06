import React from 'react';
import { Task } from '../../type';
import { Button, Stack } from '@mui/material';

interface IBoardTasksListProps {
  tasksList?: Task[]
}

export const BoardTasksList = ({ tasksList }: IBoardTasksListProps) => {
  console.log(tasksList)
  return (
    <Stack spacing={3} direction="row">
      {tasksList?.map((task: Task) => (
        <Button key={task.id} variant="outlined">
          {task.listName}
        </Button>
      ))}
    </Stack>
  )
}
