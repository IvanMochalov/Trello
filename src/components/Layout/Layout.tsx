import { Box, Container } from '@mui/material';
import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TBoard, TInitialData, TStep, TTask } from '../../type';
import { randomId } from '../../utils/getRandomId';
import { TaskEvents } from '../../utils/handleEvents/TaskEvents';
import { instanceOfTBoard } from '../../utils/instanceOfTBoard';
import { instanceOfTTask } from '../../utils/instanceOfTTask';
import { Smile } from '../Smile';
import styles from './layout.module.css';
import { BoardEvents } from '../../utils/handleEvents/BoardEvents';
import { StepEvents } from '../../utils/handleEvents/StepEvents';

export const Layout = () => {
	const [initialValue, setInitialValue] = useLocalStorage<
		TInitialData | Object
	>({ steps: {}, tasks: {}, boards: {}, boardOrder: [] }, 'boardsList');

	const { board_id } = useParams<{ board_id: string }>();
	const currBoard = initialValue.boards && initialValue.boards[board_id || ''];

	const [isHappy, setIsHappy] = React.useState(true);
	const location = useLocation();

	React.useEffect(() => {
		if (
			location.pathname === `/boards/${board_id}` &&
			currBoard === undefined
		) {
			setIsHappy(false);
		} else {
			setIsHappy(true);
		}
	}, [board_id, currBoard, location]);

	const handleDragEnd = (result: DropResult) => (currentBoard: TBoard) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		const notIsDrag =
			destination.droppableId === source.droppableId &&
			destination.index === source.index;

		if (notIsDrag) {
			return;
		}

		const dataEvent = {
			initialValue,
			source,
			destination,
			draggableId,
		};

		if (type === 'task') {
			const newState = TaskEvents.drag({
				...dataEvent,
				currentBoard,
			});

			setInitialValue(newState);
			return;
		}

		const home: TTask = initialValue.tasks[source.droppableId];
		const foreign: TTask = initialValue.tasks[destination.droppableId];

		if (home === foreign) {
			const newState = StepEvents.dragOnTask({
				...dataEvent,
				home,
			});
			setInitialValue(newState);
			return;
		}

		const newState = StepEvents.dragBetweenTasks({
			...dataEvent,
			home,
			foreign,
		});

		setInitialValue(newState);
	};

	const handleSave = (itemName: string, currentParent?: TBoard | TTask) => {
		const isBoard = currentParent === undefined;
		const isTask = instanceOfTBoard(currentParent);
		const isStep = instanceOfTTask(currentParent);

		const newId = randomId(10);
		let newState = {};
		const dataEvent = {
			newId,
			itemName,
			initialValue,
		};

		if (isTask) {
			newState = TaskEvents.save({
				...dataEvent,
				currentParent,
			});
		}

		if (isStep) {
			newState = StepEvents.save({
				...dataEvent,
				currentParent,
			});
		}

		if (isBoard) {
			newState = BoardEvents.save({
				...dataEvent,
			});
		}

		setInitialValue(newState);
	};

	const handleDelete = (
		currentItem: TBoard | TTask | TStep,
		currentParent?: TBoard | TTask
	) => {
		const isBoard = instanceOfTBoard(currentItem);
		const isTask =
			instanceOfTTask(currentItem) &&
			instanceOfTBoard(currentParent) &&
			currentParent !== undefined;
		const isStep =
			!instanceOfTBoard(currentItem) &&
			!instanceOfTTask(currentItem) &&
			!instanceOfTBoard(currentParent) &&
			currentParent !== undefined;

		let newState = {};
		const dataEvent = {
			initialValue,
		};

		if (isBoard) {
			newState = BoardEvents.delete({
				...dataEvent,
				currentItem,
			});
		}

		if (isTask) {
			newState = TaskEvents.delete({
				...dataEvent,
				currentItem,
				currentParent,
			});
		}

		if (isStep) {
			newState = StepEvents.delete({
				...dataEvent,
				currentItem,
				currentParent,
			});
		}

		setInitialValue(newState);
	};

	const handleEdit = (
		currentItem: TBoard | TTask | TStep,
		newItemName: string
	) => {
		const isBoard = instanceOfTBoard(currentItem);
		const isTask = instanceOfTTask(currentItem);
		const isStep =
			!instanceOfTBoard(currentItem) && !instanceOfTTask(currentItem);

		let newState = {};

		if (currentItem.title === newItemName) {
			return;
		}

		const dataEvent = {
			newItemName,
			initialValue,
		};

		if (isBoard) {
			newState = BoardEvents.edit({
				...dataEvent,
				currentItem,
			});
		}

		if (isTask) {
			newState = TaskEvents.edit({
				...dataEvent,
				currentItem,
			});
		}

		if (isStep) {
			newState = StepEvents.edit({
				...dataEvent,
				currentItem,
			});
		}

		setInitialValue(newState);
	};

	const handleToggleDone = (currentItem: TStep) => {
		const dataEvent = {
			currentItem,
			initialValue,
		};

		const newState = StepEvents.toggleDone({
			...dataEvent,
		});

		setInitialValue(newState);
	};

	const handleSort = (
		ids: string[],
		currentParent: TTask,
		direction: boolean
	) => {
		if (ids.length === 0 || ids === undefined) {
			return;
		}

		const dataEvent = {
			ids,
			currentParent,
			direction,
			initialValue,
		};

		const newState = StepEvents.sort({
			...dataEvent,
		});

		setInitialValue(newState);
	};

	return (
		<React.Fragment>
			<Container maxWidth='xl'>
				<Box>
					<div className={styles.smileWrapper}>
						<Link
							to='/boards'
							tabIndex={-1}
							style={{
								textDecoration: 'none',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Smile happy={isHappy} />
						</Link>
					</div>
					<Outlet
						context={{
							data: initialValue,
							handlers: {
								dragEnd: handleDragEnd,
								itemSave: handleSave,
								itemDelete: handleDelete,
								itemEdit: handleEdit,
								itemSort: handleSort,
								itemToggleDone: handleToggleDone,
							},
						}}
					/>
				</Box>
			</Container>
		</React.Fragment>
	);
};
