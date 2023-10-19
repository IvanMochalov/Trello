import { DropResult } from 'react-beautiful-dnd';

export type TStep = {
	id: string;
	title: string;
	done: boolean;
};

export type TTask = {
	id: string;
	title: string;
	stepIds: string[];
};

export type TBoard = {
	id: string;
	title: string;
	taskIds: string[];
};

export type TInitialData = {
	boardOrder: string[];
	boards: {
		[key: string]: TBoard;
	};
	steps: {
		[key: string]: TStep;
	};
	tasks: {
		[key: string]: TTask;
	};
};

export type THandlers = {
	dragEnd: (result: DropResult) => (currentBoard: TBoard) => void;
	itemSave: (itemName: string, currentParent?: TBoard | TTask) => void;
	itemDelete: (
		currentItem: TBoard | TTask | TStep,
		currentParent?: TBoard | TTask
	) => void;
	itemEdit: (currentItem: TBoard | TTask | TStep, newItemName: string) => void;
	itemSort: (ids: string[], currentParent: TTask, direction: boolean) => void;
	itemToggleDone: (currentItem: TStep) => void;
};

export type TOutletContext = {
	data: TInitialData;
	handlers: THandlers;
};
