import * as React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Box,
	useMediaQuery,
	FormControl,
	OutlinedInput,
	Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useOutletContext } from 'react-router-dom';
import { TBoard, TOutletContext } from '../../type';
import styled from 'styled-components';

interface INewTask {
	currBoard: TBoard;
}

const ButtonAddList = styled.button`
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
	border: 1px solid rgba(25, 118, 210, 0.5);
	color: #1976d2;
	font-weight: 500;
	font-size: 0.875rem;
	line-height: 1;
	letter-spacing: 0.02857em;
	text-transform: uppercase;
	min-width: 64px;
	padding: 5px 15px;
	border-radius: 4px;
	background-color: transparent;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		outline: none;
		background-color: #1976d2;
		color: white;
	}

	&:focus-visible {
		outline: none;
		background-color: rgba(25, 118, 210, 0.5);
		color: white;
	}

	@media (min-width: 768px) {
		line-height: 1.75;
	}
`;

export const NewTask = ({ currBoard }: INewTask) => {
	const {
		handlers: { itemSave },
	} = useOutletContext<TOutletContext>();
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

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTaskName(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (taskName === '') {
			return;
		}
		itemSave(taskName.trim(), currBoard);
		setTaskName('');
		setOpen(false);
	};

	return (
		<>
			<Tooltip title='Добавить список' placement='top-start'>
				<ButtonAddList onClick={handleClickOpen}>Добавить список</ButtonAddList>
			</Tooltip>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby='responsive-dialog-title'
			>
				<DialogTitle id='responsive-dialog-title'>
					{'Название списка'}
				</DialogTitle>
				<DialogContent>
					<Box
						component='div'
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
					>
						<form
							id={formTaskId}
							noValidate
							autoComplete='off'
							onSubmit={handleSubmit}
						>
							<FormControl>
								<OutlinedInput
									placeholder='Список №1'
									onChange={handleChange}
									autoFocus
								/>
							</FormControl>
						</form>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отмена</Button>
					<Button type='submit' form={formTaskId}>
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
