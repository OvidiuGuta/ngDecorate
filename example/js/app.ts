/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../build/ngDecorate.d.ts" />

import * as angular from 'angular';
import 'angular-ui-router';
import {TodoCtrl} from './controllers/todoCtrl';
import {todoEscape} from './directives/todoEscape';
import {todoFocus} from './directives/todoFocus';

import {bootstrap} from 'ngDecorate/ngDecorate';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
		$stateProvider			
		    .state('home', {
			    url: '/home/:filter',
			    templateUrl: '../templates/todoApp.html',
				controller: 'TodoCtrl',
				controllerAs: 'TodoCtrl'
		    })
		$urlRouterProvider.otherwise('/home/');			
	}])
	.directive('todoEscape', todoEscape)
	.directive('todoFocus', todoFocus);	

bootstrap(angular.module('todomvc'), TodoCtrl);