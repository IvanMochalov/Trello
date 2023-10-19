export const initialData = {
	steps: {
		'step-1': { id: 'step-1', title: 'Подключить Redux-1', done: false },
		'step-2': { id: 'step-2', title: 'Подключить Redux-2', done: false },
		'step-3': { id: 'step-3', title: 'Подключить Redux-3', done: false },
		'step-4': { id: 'step-4', title: 'Подключить Redux-4', done: false },
		'step-5': { id: 'step-5', title: 'Установить Redux-1', done: false },
		'step-6': { id: 'step-6', title: 'Установить Redux-2', done: false },
		'step-7': { id: 'step-7', title: 'Установить Redux-3', done: false },
		'step-8': { id: 'step-8', title: 'Установить Redux-4', done: false },
	},
	tasks: {
		'task-1': {
			id: 'task-1',
			title: 'Работа с данными',
			stepIds: ['step-1', 'step-2', 'step-3', 'step-4'],
		},
		'task-2': {
			id: 'task-2',
			title: 'Настройка окружения',
			stepIds: ['step-5', 'step-6', 'step-7', 'step-8'],
		},
		'task-3': {
			id: 'task-3',
			title: 'Решение проблем',
			stepIds: [],
		},
		'task-4': {
			id: 'task-4',
			title: 'Поиск решений',
			stepIds: [],
		},
	},
	boards: {
		'board-1': {
			id: 'board-1',
			title: 'Данные',
			taskIds: ['task-1', 'task-3'],
		},
		'board-2': {
			id: 'board-2',
			title: 'Окружение',
			taskIds: ['task-2', 'task-4'],
		},
	},
	boardOrder: ['board-1', 'board-2'],
};
