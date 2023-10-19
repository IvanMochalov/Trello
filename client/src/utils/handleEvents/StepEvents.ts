import { DraggableLocation } from 'react-beautiful-dnd';
import { TBoard, TTask, TStep, TInitialData } from '../../type';

export const StepEvents = {
	save(data: {
		newId: string;
		itemName: string;
		initialValue: TInitialData;
		currentParent: TTask;
	}) {
		const { newId, itemName, initialValue, currentParent } = data;
		const newStep = {
			id: newId,
			title: itemName,
			done: false,
		};

		return {
			...initialValue,
			steps: {
				...initialValue.steps,
				[newStep.id]: newStep,
			},
			tasks: {
				...initialValue.tasks,
				[currentParent.id]: {
					...currentParent,
					stepIds: [newId, ...currentParent.stepIds],
				},
			},
		};
	},
	delete(
		initialValue: TInitialData,
		currentItem: TStep,
		currentParent: TBoard | TTask
	) {
		delete initialValue.steps[currentItem.id];

		const currentTaskStepIds = initialValue.tasks[
			currentParent.id
		].stepIds.filter(function (id: string) {
			return id !== currentItem.id;
		});

		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[currentParent.id]: {
					...initialValue.tasks[currentParent.id],
					stepIds: currentTaskStepIds,
				},
			},
		};
	},
	edit(newItemName: string, currentItem: TStep, initialValue: TInitialData) {
		const currentStep = initialValue.steps[currentItem.id];

		const newStep = {
			...currentStep,
			title: newItemName,
		};

		return {
			...initialValue,
			steps: {
				...initialValue.steps,
				[newStep.id]: newStep,
			},
		};
	},
	toggleDone(currentItem: TStep, initialValue: TInitialData) {
		const currentStep = initialValue.steps[currentItem.id];

		const newStep = {
			...currentStep,
			done: !currentStep.done,
		};

		return {
			...initialValue,
			steps: {
				...initialValue.steps,
				[newStep.id]: newStep,
			},
		};
	},
	sort(
		ids: string[],
		currentParent: TTask,
		direction: boolean,
		initialValue: TInitialData
	) {
		const newStepIds = ids
			.map(id => {
				return initialValue.steps[id];
			})
			.sort((a, b) => {
				return !direction
					? a.title.localeCompare(b.title)
					: b.title.localeCompare(a.title);
			})
			.map(step => step.id);

		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[currentParent.id]: {
					...currentParent,
					stepIds: newStepIds,
				},
			},
		};
	},
	dragOnTask(data: {
		initialValue: TInitialData;
		source: DraggableLocation;
		destination: DraggableLocation;
		draggableId: string;
		home: TTask;
	}) {
		const { initialValue, source, destination, draggableId, home } = data;
		const newStepIds = Array.from(home.stepIds);
		newStepIds.splice(source.index, 1);
		newStepIds.splice(destination.index, 0, draggableId);

		const newTask = {
			...home,
			stepIds: newStepIds,
		};

		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[newTask.id]: newTask,
			},
		};
	},
	dragBetweenTasks(data: {
		initialValue: TInitialData;
		source: DraggableLocation;
		destination: DraggableLocation;
		draggableId: string;
		home: TTask;
		foreign: TTask;
	}) {
		const { initialValue, source, destination, draggableId, home, foreign } =
			data;
		const homeStepIds = Array.from(home.stepIds);
		homeStepIds.splice(source.index, 1);
		const newHome = {
			...home,
			stepIds: homeStepIds,
		};

		const foreignStepIds = Array.from(foreign.stepIds);
		foreignStepIds.splice(destination.index, 0, draggableId);
		const newForeign = {
			...foreign,
			stepIds: foreignStepIds,
		};

		return {
			...initialValue,
			tasks: {
				...initialValue.tasks,
				[newHome.id]: newHome,
				[newForeign.id]: newForeign,
			},
		};
	},
};
