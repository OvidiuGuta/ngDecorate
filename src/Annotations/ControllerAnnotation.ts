/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import {AngularAnnotation} from './AngularAnnotation';
import MetadataType from './MetadataType';
import {ServiceAnnotation} from './ServiceAnnotation';
import {IControllerAnnotationOptions} from './AnnotationOptions/IControllerAnnotationOptions';

export class ControllerAnnotation extends AngularAnnotation {
	private module: angular.IModule;
	private params: IControllerAnnotationOptions;
	constructor(params: IControllerAnnotationOptions, target: Function) {
		super(MetadataType.CONTROLLER, target);
		this.params = params;
	}
	
	getName(): string {
		return this.params.name
	}
	
	register(module: angular.IModule) : angular.IModule {
		this.module = module;
		if(this.isRegistered()) {
			return module;
		}
		this.reattach();
		
		ServiceAnnotation.registerServices(this.module, this.params.appInjector);
		
		return this.module.controller(this.params.name, this.target);
	}
	
	static getControllerAnnotation(target: Function): ControllerAnnotation{
		return <ControllerAnnotation>AngularAnnotation.getAnnotation(MetadataType.CONTROLLER, target);
	};
}

export function Controller(options: IControllerAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new ControllerAnnotation(options, Constructor).attach();
	});
}