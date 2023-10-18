import { TBoard, TInitialData, TTask } from '../../type';

export const TaskEvents = {
	save(
		newId: string,
		itemName: string,
		currentParent: TBoard,
		initialValue: TInitialData
	) {
		const newTask = {
			id: newId,
			title: itemName,
			stepIds: [],
		}

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
		}
	},
	delete(
		initialValue: TInitialData,
		currentItem: TTask,
		currentParent: TBoard | TTask
	) {
		const currentTask = initialValue.tasks[currentItem.id]

		currentTask.stepIds.forEach((stepId: string) => {
			delete initialValue.steps[stepId]
		})

		delete initialValue.tasks[currentItem.id]

		const currentBoardTaskIds = initialValue.boards[
			currentParent.id
		].taskIds.filter(function (id: string) {
			return id !== currentItem.id
		})

		return {
			...initialValue,
			boards: {
				...initialValue.boards,
				[currentParent.id]: {
					...initialValue.boards[currentParent.id],
					taskIds: currentBoardTaskIds,
				},
			},
		}
	},
	edit(newItemName: string, currentItem: TTask, initialValue: TInitialData) {
		const currentTask = initialValue.tasks[currentItem.id]

		const newTask = {
			...currentTask,
			title: newItemName,
		}
		console.log('edit')
		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[newTask.id]: newTask,
			},
		}
	},
	drag(newTaskIds: string[], currentBoard: TBoard, initialValue: TInitialData) {
		const newBoard = {
			...currentBoard,
			taskIds: newTaskIds,
		}

		return {
			...initialValue,
			boards: {
				...initialValue.boards,
				[currentBoard.id]: newBoard,
			},
		}
	},
}
