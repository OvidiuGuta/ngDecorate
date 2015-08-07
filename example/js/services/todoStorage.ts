/**
 * Services that persists and retrieves TODOs from localStorage
*/

import {Todo} from '../controllers/todoCtrl'
import {Service} from 'ngDecorate/ngDecorate';

@Service({
	name: 'TodoStorage',
	factory: false
})
export class TodoStorage {
	STORAGE_ID: string = 'todos-angularjs-perf';
	
	constructor() {}
	
	get() : Todo[] {
		return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
	}

	put(todos: Todo[]): void {
		localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
	} 
	
	static $factory(): TodoStorage {
		return new TodoStorage();
	}
}