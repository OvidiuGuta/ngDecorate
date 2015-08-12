/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {ViewAnnotation} from './ViewAnnotation';
import {ServiceAnnotation} from './ServiceAnnotation';
import {IComponentAnnotationOptions} from './AnnotationOptions/IComponentAnnotationOptions';

export interface ComponentFunction extends FunctionConstructor {
	[key: string]: Function;
	$compile?: Function;
	$link?: Function;compile?: Function;
}

export class ComponentAnnotation extends AngularAnnotation {
	private module: angular.IModule;
	private params: IComponentAnnotationOptions;
	private registered: boolean;
	private viewAnnotation: ViewAnnotation;
	
	constructor(params: IComponentAnnotationOptions, target: Function) {
		super(MetadataType.DIRECTIVE, target);
		this.params = params;
		this.registered = false;
		
		this.viewAnnotation = this.getViewAnnotation();
	}
	
	register(module: angular.IModule) : angular.IModule {
		if(this.registered) {
			return module;
		}
		
		this.registerServices(module);
		this.viewAnnotation.registerDirectives(module);	
		
		this.registered = true;
		this.attach();
		
		return module.directive(this.params.selector, this.getComponentDefinitionFunction());
	}
	
	registerServices(module: angular.IModule) {
		for(let target of this.params.appInjector) {
			let serviceAnnotation = <ServiceAnnotation>AngularAnnotation.getAnnotation(MetadataType.SERVICE, target);
			serviceAnnotation.register(module);
		}
	}
	
	private getComponentDefinitionFunction(): angular.IDirectiveFactory {
		let target = this.target;
		let ddo = this.getDDO();
		let componentDefinitionFunction = (...injectables: any[]) => {
			for(let i = 0; i < injectables.length; i++) {
				let injectableName = componentDefinitionFunction.$inject[i];
				(<ComponentFunction>target)[injectableName] = injectables[i];
			}
			return ddo;
		}
		
		componentDefinitionFunction.$inject = this.params.staticInject;
		
		return componentDefinitionFunction;
	}
	
	private getDDO(): angular.IDirective {
		let ddo: angular.IDirective = angular.extend({}, {
				bindToController: true,
				compile: (<ComponentFunction>this.target).$compile,
				controller: this.target,
				controllerAs: this.target.name,
				link: (<ComponentFunction>this.target).$link,
				restrinct: 'E',
				replace: true,
				scope: true,
				template: this.viewAnnotation.getTemplate(),
				templateUrl: this.viewAnnotation.getTemplateUrl()
			}, this.params.ddo);
			
		return ddo;
	}
	
	getViewAnnotation(): ViewAnnotation{
		return <ViewAnnotation>AngularAnnotation.getAnnotation(MetadataType.VIEW, this.target);
	};
}

export function Component(options: IComponentAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new ComponentAnnotation(options, Constructor).attach();
	});
}