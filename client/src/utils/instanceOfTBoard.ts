import { TBoard } from '../type';

export function instanceOfTBoard(object: any): object is TBoard {
	if (object === undefined) {
		return false;
	}
	return 'taskIds' in object;
}
