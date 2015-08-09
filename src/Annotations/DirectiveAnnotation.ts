/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import {annotate, MetadataType} from '../annotate';
import {AngularAnnotation} from './AngularAnnotation';

export interface IDirectiveAnnotationOptions {
	selector: string;
	ddo?: angular.IDirective;
};

export interface DirectiveFunction extends FunctionConstructor {
	$compile?: Function;
	$link?: Function;compile?: Function;
}

export class DirectiveAnnotation extends AngularAnnotation {
	private module: angular.IModule;
	private params: IDirectiveAnnotationOptions;
	
	constructor(params: IDirectiveAnnotationOptions, target: Function) {
		super(MetadataType.DIRECTIVE, target);
		this.params = params;
	}
	
	register(module: angular.IModule) : angular.IModule {
		let ddo: angular.IDirective = angular.extend({}, {
				bindToController: true,
				compile: (<DirectiveFunction>this.target).$compile,
				controller: this.target,
				controllerAs: name,
				link: (<DirectiveFunction>this.target).$link,
				restrinct: 'AC',
				scope: true,
			}, this.params.ddo);
		
		return module.directive(this.params.selector, () => {
			return ddo;
		});
	}
}

export function Directive(options: IDirectiveAnnotationOptions) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
			case 1:
			  new DirectiveAnnotation(options, Constructor).attach();
			  break;
			default:
			  throw new Error("Decorators are only valid on class declarations!");
		}
	}
}