import { TTask } from '../type';

export function instanceOfTTask(object: any): object is TTask {
	if (object === undefined) {
		return false;
	}
	return 'stepIds' in object;
}
