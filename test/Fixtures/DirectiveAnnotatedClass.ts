/// <reference path="../../dev/ngDecorate.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {Directive} from 'ngDecorate/ngDecorate'


@Directive({
	selector: 'addClass'
})
export class SimpleDirective {
	static name: string;
	static $link(scope: angular.IScope, elem: angular.IAugmentedJQuery, attrs: any) {
		elem.addClass('testClass'); 
	}
}

@Directive({
	selector: 'dirictiveWithInjects',
	staticInject: ['staticInjectable']
}) 
export class DirectiveWithInjects {
	static staticInjectable: string;
}