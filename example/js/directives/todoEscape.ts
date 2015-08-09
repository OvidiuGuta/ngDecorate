/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../build/ngDecorate.d.ts" />
import {Directive, View} from 'ngDecorate/ngDecorate';

@Directive({
	selector: 'todoEscape'
})
export class TodoEscape {
	static $link(scope: angular.IScope, elem: angular.IAugmentedJQuery, attrs: any) {
		let ESCAPE_KEY = 27;
		
		elem.bind('keydown', function(event: JQueryEventObject) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});

		scope.$on('$destroy', function () {
			elem.unbind('keydown');
		});
	}
}
