/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */

/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../build/ngDecorate.d.ts" />
import {Directive} from 'ngDecorate/ngDecorate';

@Directive({
	selector: 'todoFocus',
	staticInject: ['$timeout']
})
export class TodoFocus {
	static $timeout: angular.ITimeoutService;
	
	static $link(scope : angular.IScope, elem: HTMLElement[], attrs: any) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				TodoFocus.$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	}
}