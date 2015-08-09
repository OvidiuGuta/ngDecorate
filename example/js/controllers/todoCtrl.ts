/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../build/ngDecorate.d.ts" />
import {Controller, Inject, View, RouteConfig} from 'ngDecorate/ngDecorate';
import {TodoStorage} from '../services/todoStorage';
import {TodoEscape} from '../directives/todoEscape';

export interface Todo {
	title: string;
	completed: boolean;
}

@RouteConfig({
	name: 'home',
	config: {
		url: '/home/:filter'
	}
})
@Controller({
	name: 'TodoCtrl',
	appInjector: [TodoStorage]
})
@View({
	templateUrl: '../templates/todoApp.html',
	directives: [TodoEscape];
})
@Inject('$scope', '$location', '$filter', '$stateParams', 'TodoStorage')
export class TodoCtrl {
	todos: Todo[];
	newTodo: string;
	remainingCount: number;
	editedTodo: Todo;
	originalTodo: Todo;
	statusFilter: Object;
	allChecked: boolean;
	
	constructor(private $scope: angular.IScope, 
		private $location: angular.ILocationService, 
		private $filter: angular.IFilterService,
		private $stateParams: angular.ui.IStateParamsService, 
		private todoStorage: TodoStorage) {
		
		this.todos = todoStorage.get();
		
		this.newTodo = '';
		this.remainingCount = $filter('filter')(this.todos, {completed: false}).length;
		this.editedTodo = null;
		
		switch($stateParams.filter) {
			case 'active':
			 	this.statusFilter = {completed: false};
				break;
			case 'completed':
			 	this.statusFilter = {completed: true};
				break; 
			default:
				this.statusFilter = undefined; 
		}
		// this.statusFilter = { "/active": {completed: false}, "/completed": {completed: true} }[path];
	
		$scope.$watch('rematodoCtrliningCount == 0',(val) => {
			this.allChecked = val;
		});
	}
	
	addTodo() {
		var newTodo = this.newTodo.trim();
		if (newTodo.length === 0) {
			return;
		}

		this.todos.push({
			title: newTodo,
			completed: false
		});
		this.todoStorage.put(this.todos);

		this.newTodo = '';
		this.remainingCount++;
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

	clearCompletedTodos () {
		this.todos = this.todos.filter(function (val) {
			return !val.completed;
		});
		this.todoStorage.put(this.todos);
	};

	markAll(completed: boolean) {
		this.todos.forEach(function (todo) {
			todo.completed = !completed;
		});
		this.remainingCount = completed ? this.todos.length : 0;
		this.todoStorage.put(this.todos);
	};
}