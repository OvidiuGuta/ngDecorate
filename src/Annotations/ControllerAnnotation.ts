/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import {annotate, getAnnotation, MetadataType} from '../annotate';
import {AngularAnnotation, IAngularAnnotationOptions} from './AngularAnnotation';
import {ServiceAnnotation} from './ServiceAnnotation';

export interface IControllerAnnotationOptions extends IAngularAnnotationOptions {
	appInjector: Function[];
};

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
			let serviceAnnotation = <ServiceAnnotation>getAnnotation(MetadataType.SERVICE, target);
			serviceAnnotation.register(this.module);
		}
	}
}

export function Controller(options: IControllerAnnotationOptions) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
		case 1:
		  new ControllerAnnotation(options, Constructor).attach();
		  break;
		default:
		  throw new Error("Decorators are only valid on class declarations!");
		}
	}
}