/// <reference path="../../dev/ngDecorate.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {Directive} from 'ngDecorate/ngDecorate'


@Directive({
	selector: 'addClass'
})
export class SimpleDirective {
	static $link(scope: angular.IScope, elem: angular.IAugmentedJQuery, attrs: any) {
		elem.addClass('testClass'); 
	}
}