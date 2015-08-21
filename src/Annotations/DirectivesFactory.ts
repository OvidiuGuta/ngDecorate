/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {IDirectiveAnnotationOptions} from './AnnotationOptions/IDirectiveAnnotationOptions';
import {IComponentAnnotationOptions} from './AnnotationOptions/IComponentAnnotationOptions';


export interface DirectiveFunction extends FunctionConstructor {
	[key: string]: Function;
	$compile?: Function;
	$link?: Function;
	compile?: Function;
}

export interface INamedFunction extends Function {
	name: string
}

export class DirectiveFactory {
	ddo: angular.IDirective;
	
	getDirectiveDefinitionFunction(params: IDirectiveAnnotationOptions | IComponentAnnotationOptions, target: Function): angular.IDirectiveFactory {
		let ddo = this.getDDO(params, target);
		let directiveDefinitionFunction = (...injectables: any[]) => {
			for(let i = 0; i < injectables.length; i++) {
				let injectableName = directiveDefinitionFunction.$inject[i];
				(<DirectiveFunction>target)[injectableName] = injectables[i];
			}
			return ddo;
		}
		
		directiveDefinitionFunction.$inject = params.staticInject;
		
		return directiveDefinitionFunction;
	}
	
	getDDO(params: IDirectiveAnnotationOptions | IComponentAnnotationOptions, target: Function): angular.IDirective {
		this.ddo.compile= <angular.IDirectiveCompileFn>(<DirectiveFunction>target).$compile;
		this.ddo.link= <angular.IDirectiveLinkFn>(<DirectiveFunction>target).$link;
		this.ddo.controller = target;
		this.ddo.controllerAs = (<INamedFunction>target).name;
		
		let ddo: angular.IDirective = angular.extend({}, this.ddo, params.ddo);
			
		return ddo;
	}
}