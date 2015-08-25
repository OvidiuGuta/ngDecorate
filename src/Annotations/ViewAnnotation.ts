/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {Annotation} from './Annotation';
import MetadataType from './MetadataType';
import {DirectiveAnnotation} from './DirectiveAnnotation';
import {ComponentAnnotation} from './ComponentAnnotation';
import {IViewAnnotationOptions} from './AnnotationOptions/IViewAnnotationOptions'

export class ViewAnnotation extends Annotation {
	private params: IViewAnnotationOptions;
	
	constructor(params: IViewAnnotationOptions, classConstructor: Function) {
		super(MetadataType.VIEW, classConstructor);
		
		this.params = params;
	}
	
	getTemplate(): string {
		return this.params.template;
	}
	
	getTemplateUrl(): string {
		return this.params.templateUrl;
	}
	
	registerDirectives(module: angular.IModule): angular.IModule {
		if(!this.params.directives) {
			return;
		}
		for(let directive of this.params.directives) {
			this.registerDirective(module, directive);	
		}
		
		return module;
	}
	
	registerDirective(module: angular.IModule, directive: Function): void {
		if(Annotation.hasAnnotation(MetadataType.DIRECTIVE, directive)) {
			(<DirectiveAnnotation>Annotation.getAnnotation(MetadataType.DIRECTIVE, directive)).register(module);
		}
		
		if(Annotation.hasAnnotation(MetadataType.COMPONENT, directive)) {
			(<ComponentAnnotation>Annotation.getAnnotation(MetadataType.COMPONENT, directive)).register(module);
		}
	}
	
	static getViewAnnotation(target: Function) : ViewAnnotation{
		return <ViewAnnotation>Annotation.getAnnotation(MetadataType.VIEW, target);
	}
}

export function View(options: IViewAnnotationOptions) {
	return Annotation.getClassDecorator((Constructor: Function) => {
		new ViewAnnotation(options, Constructor).attach();
	});
}