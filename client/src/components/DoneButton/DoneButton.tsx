import React from 'react';
import { Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { TStep } from '../../type';

interface IDoneButtonProps {
	item: TStep;
	handleClick: (step: TStep) => void;
	done: boolean;
}

export const DoneButton = ({ item, done, handleClick }: IDoneButtonProps) => {
	return (
		<Button
			onClick={() => handleClick(item)}
			sx={{
				minWidth: '40px',
				borderRadius: '100%',
				'&:hover': {
					backgroundColor: 'rgba(0, 0, 0, 0.04)',
				},
			}}
		>
			<TaskAltIcon sx={{ color: done ? 'green' : 'gray' }} />
		</Button>
	);
};
