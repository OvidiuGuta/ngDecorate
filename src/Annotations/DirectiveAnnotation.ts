/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {IDirectiveAnnotationOptions} from './AnnotationOptions/IDirectiveAnnotationOptions';

// export interface IDirectiveAnnotationOptions {
// 	selector: string;
// 	staticInject?: string[];
// 	ddo?: angular.IDirective;
// };

export class DirectiveAnnotation extends AngularAnnotation {
	private module: angular.IModule;
	private params: IDirectiveAnnotationOptions;
	private registered: boolean;
	
	constructor(params: IDirectiveAnnotationOptions, target: Function) {
		super(MetadataType.DIRECTIVE, target);
		this.params = params;
		this.registered = false;
	}
	
	register(module: angular.IModule) : angular.IModule {
		if(this.registered) {
			return module;
		}
		
		this.registered = true;
		this.attach();
		
		return module.directive(this.params.selector, this.getDirectiveDefinitionFunction());
	}
	
	private getDirectiveDefinitionFunction(): angular.IDirectiveFactory {
		let target = this.target;
		let ddo = this.getDDO();
		let directiveDefinitionFunction = (...injectables: any[]) => {
			for(let i = 0; i < injectables.length; i++) {
				let injectableName = directiveDefinitionFunction.$inject[i];
				(<DirectiveFunction>target)[injectableName] = injectables[i];
			}
			return ddo;
		}
		
		directiveDefinitionFunction.$inject = this.params.staticInject;
		
		return directiveDefinitionFunction;
	}
	
	private getDDO(): angular.IDirective {
		let ddo: angular.IDirective = angular.extend({}, {
				bindToController: true,
				compile: (<DirectiveFunction>this.target).$compile,
				controller: this.target,
				controllerAs: name,
				link: (<DirectiveFunction>this.target).$link,
				restrinct: 'AC',
				scope: true,
			}, this.params.ddo);
			
		return ddo;
	}
}

export function Directive(options: IDirectiveAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new DirectiveAnnotation(options, Constructor).attach();
	});
}