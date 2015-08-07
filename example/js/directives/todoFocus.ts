/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */
export function todoFocus($timeout: angular.ITimeoutService) {
	return function (scope : angular.IScope, elem: HTMLElement[], attrs: any) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
};
