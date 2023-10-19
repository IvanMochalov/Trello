import { DraggableLocation } from 'react-beautiful-dnd';
import { TBoard, TInitialData, TTask } from '../../type';

export const TaskEvents = {
	save(data: {
		newId: string;
		itemName: string;
		initialValue: TInitialData;
		currentParent: TBoard;
	}) {
		const { newId, itemName, initialValue, currentParent } = data;
		const newTask = {
			id: newId,
			title: itemName,
			stepIds: [],
		};

		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[newTask.id]: newTask,
			},
			boards: {
				...initialValue.boards,
				[currentParent.id]: {
					...currentParent,
					taskIds: [newId, ...currentParent.taskIds],
				},
			},
		};
	},
	delete(data: {
		initialValue: TInitialData;
		currentItem: TTask;
		currentParent: TBoard;
	}) {
		const { initialValue, currentItem, currentParent } = data;
		const currentTask = initialValue.tasks[currentItem.id];

		currentTask.stepIds.forEach((stepId: string) => {
			delete initialValue.steps[stepId];
		});

		delete initialValue.tasks[currentItem.id];

		const currentBoardTaskIds = initialValue.boards[
			currentParent.id
		].taskIds.filter(function (id: string) {
			return id !== currentItem.id;
		});

		return {
			...initialValue,
			boards: {
				...initialValue.boards,
				[currentParent.id]: {
					...initialValue.boards[currentParent.id],
					taskIds: currentBoardTaskIds,
				},
			},
		};
	},
	edit(data: {
		newItemName: string;
		initialValue: TInitialData;
		currentItem: TTask;
	}) {
		const { newItemName, initialValue, currentItem } = data;
		const currentTask = initialValue.tasks[currentItem.id];

		const newTask = {
			...currentTask,
			title: newItemName,
		};
		console.log('edit');
		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[newTask.id]: newTask,
			},
		};
	},
	drag(data: {
		initialValue: TInitialData;
		source: DraggableLocation;
		destination: DraggableLocation;
		draggableId: string;
		currentBoard: TBoard;
	}) {
		const { initialValue, source, destination, draggableId, currentBoard } =
			data;
		const newTaskIds = Array.from(currentBoard.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newBoard = {
			...currentBoard,
			taskIds: newTaskIds,
		};

		return {
			...initialValue,
			boards: {
				...initialValue.boards,
				[currentBoard.id]: newBoard,
			},
		};
	},
};
