/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../build/ngDecorate.d.ts" />
import {Directive, View} from 'ngDecorate/ngDecorate';

@Directive({
	selector: 'todoEscape',
	ddo: {}
})
export class TodoEscape {
	static $link(scope: angular.IScope, elem: IHtmlElemetn, attrs: any) {
		let ESCAPE_KEY = 27;
		
		elem.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});

		scope.$on('$destroy', function () {
			elem.unbind('keydown');
		});
	}
}
