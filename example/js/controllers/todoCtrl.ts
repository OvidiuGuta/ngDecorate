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
import {TodoList} from '../components/todoList';

export interface Todo {
	title: string;
	completed: boolean;
}

export interface ITodoStateParams extends angular.ui.IStateParamsService {
	filter: string
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
	directives: [TodoList]
})
@Inject('$scope', '$location', '$filter', '$stateParams', 'TodoStorage')
export class TodoCtrl {
	todos: Todo[];
	newTodo: string;
	remainingCount: number;
	statusFilter: Object;
	
	constructor(private $scope: angular.IScope, 
		private $location: angular.ILocationService, 
		private $filter: angular.IFilterService,
		private $stateParams: ITodoStateParams, 
		private todoStorage: TodoStorage) {
		
		this.todos = todoStorage.get();
		
		this.newTodo = '';
		this.remainingCount = $filter('filter')(this.todos, {completed: false}).length;
		
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
	
	clearCompletedTodos () {
		this.todos = this.todos.filter(function (val) {
			return !val.completed;
		});
		this.todoStorage.put(this.todos);
	};
}