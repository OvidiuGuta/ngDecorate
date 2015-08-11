/// <reference path="../../../typings/angularjs/angular.d.ts" />
import {Component, View, Inject} from 'ngDecorate/ngDecorate';
import {TodoStorage} from '../services/todoStorage';
import {TodoEscape} from '../directives/todoEscape';
import {TodoFocus} from '../directives/todoFocus';
import {Todo} from '../controllers/todoCtrl'

@Component({
	selector:'todoList',
	appInjector: [TodoStorage],
	ddo: {
		scope: {
			todos: '=',
			filter: '=',
			remainingCount: '='
		}
	}
})
@View({
	templateUrl: '../../templates/todoList.html',
	directives: [TodoEscape, TodoFocus],
})
@Inject('$scope', 'TodoStorage')
export class TodoList {
	private editedTodo: Todo;
	private originalTodo: Todo;
	private remainingCount: number;
	private todos: Todo[];
	private allChecked: boolean;
	
	constructor(private $scope: angular.IScope,
				private todoStorage: TodoStorage) {
		this.editedTodo = null;
		this.allChecked = this.repainingCount === 0;
		
		$scope.$watch('TodoList.remainingCount === 0', (val) => {
			this.allChecked = val;
		});
		
		$scope.$watch('TodoList.allChecked', (val) => {
			console.log('daaa');
		});
	}
	
	editTodo(todo: Todo) {
		this.editedTodo = todo
		// Clone the original todo to restore it on demand.
		this.originalTodo = angular.extend({}, todo);
	}

	doneEditing(todo: Todo) {
		this.editedTodo = null;
		todo.title = todo.title.trim();
		
		if (!todo.title) {
			this.removeTodo(todo);
		}

		this.todoStorage.put(this.todos);
	}
	
	revertEditing(todo: Todo) {
		this.todos[this.todos.indexOf(todo)] = this.originalTodo;
		this.doneEditing(this.originalTodo);
	};

	removeTodo(todo: Todo) {
		this.remainingCount -= todo.completed ? 0 : 1;
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.todoStorage.put(this.todos);
	};
	
	todoCompleted(todo: Todo) {
		this.remainingCount += todo.completed ? -1 : 1;
		this.todoStorage.put(this.todos);
	};
	
	markAll(completed: boolean) {
		this.todos.forEach((todo) => {
			todo.completed = !completed;
		});
		this.remainingCount = completed ? this.todos.length : 0;
		this.todoStorage.put(this.todos);
	};
}