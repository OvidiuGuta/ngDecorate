/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {ViewAnnotation} from './ViewAnnotation';
import {ServiceAnnotation} from './ServiceAnnotation';
import {IComponentAnnotationOptions} from './AnnotationOptions/IComponentAnnotationOptions';
import {DirectiveFactory} from './DirectivesFactory';
import {mixin} from './Util';

export class ComponentAnnotation extends AngularAnnotation implements DirectiveFactory {
	private module: angular.IModule;
	private params: IComponentAnnotationOptions;
	private viewAnnotation: ViewAnnotation;
	ddo: angular.IDirective;
	
	constructor(params: IComponentAnnotationOptions, target: Function) {
		super(MetadataType.DIRECTIVE, target);
		this.params = params;
		this.viewAnnotation = ViewAnnotation.getViewAnnotation(this.target);
		
		this.ddo = {
				bindToController: true,
				restrinct: 'E',
				replace: true,
				scope: true,
				template: this.viewAnnotation.getTemplate(),
				templateUrl: this.viewAnnotation.getTemplateUrl()
			}
	}
	
	register(module: angular.IModule) : angular.IModule {
		if(this.isRegistered()) {
			return module;
		}
		
		ServiceAnnotation.registerServices(module, this.params.appInjector);
		this.viewAnnotation.registerDirectives(module);	
		
		this.reattach();
		
		return module.directive(this.params.selector, this.getDirectiveDefinitionFunction(this.params, this.target));
	}
	
	// From DirectiveFactory mixin
	getDirectiveDefinitionFunction: (params: IComponentAnnotationOptions, target: Function) => angular.IDirectiveFactory
	getDDO: (params: IComponentAnnotationOptions, target: Function) => angular.IDirective
}
mixin(ComponentAnnotation, [DirectiveFactory]);

export function Component(options: IComponentAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new ComponentAnnotation(options, Constructor).attach();
	});
}