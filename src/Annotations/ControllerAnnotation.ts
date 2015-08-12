/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import {AngularAnnotation} from './AngularAnnotation';
import MetadataType from './MetadataType';
import {ServiceAnnotation} from './ServiceAnnotation';
import {IControllerAnnotationOptions} from './AnnotationOptions/IControllerAnnotationOptions';

// export interface IControllerAnnotationOptions extends IAngularAnnotationOptions {
// 	appInjector: Function[];
// };

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
		this.module.controller(this.params.name, this.target);
		
		this.registerServices();
		
		return this.module;
	}
	
	registerServices() {
		for(let target of this.params.appInjector) {
			let serviceAnnotation = <ServiceAnnotation>AngularAnnotation.getAnnotation(MetadataType.SERVICE, target);
			serviceAnnotation.register(this.module);
		}
	}
}

export function Controller(options: IControllerAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new ControllerAnnotation(options, Constructor).attach();
	});
}