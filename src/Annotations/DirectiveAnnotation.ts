/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {IDirectiveAnnotationOptions} from './AnnotationOptions/IDirectiveAnnotationOptions';
import {IComponentAnnotationOptions} from './AnnotationOptions/IComponentAnnotationOptions';
import {DirectiveFactory} from './DirectivesFactory';
import {mixin} from './Util';

export class DirectiveAnnotation extends AngularAnnotation implements DirectiveFactory {
	private module: angular.IModule;
	private params: IDirectiveAnnotationOptions;
	ddo: angular.IDirective;
	
	constructor(params: IDirectiveAnnotationOptions, target: Function) {
		super(MetadataType.DIRECTIVE, target);
		this.params = params;
		this.ddo = {
			bindToController: true,
			restrinct: 'AC',
			scope: true,
		};
	}
	
	register(module: angular.IModule) : angular.IModule {
		if(this.isRegistered()) {
			return module;
		}
		
		this.reattach();
		
		return module.directive(this.params.selector, this.getDirectiveDefinitionFunction(this.params, this.target));
	}
	
	// From DirectiveFactory mixin
	getDirectiveDefinitionFunction: (params: IDirectiveAnnotationOptions, target: Function) => angular.IDirectiveFactory
	getDDO: (params: IDirectiveAnnotationOptions, target: Function) => angular.IDirective
}
mixin(DirectiveAnnotation, [DirectiveFactory]);

export function Directive(options: IDirectiveAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new DirectiveAnnotation(options, Constructor).attach();
	});
}