/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import {annotate, MetadataType} from '../annotate';
import {AngularAnnotation, IAngularAnnotationOptions} from './AngularAnnotation';

export interface IServiceAnnotationOptions extends IAngularAnnotationOptions {
	factory: boolean;
};

export interface FactoryFunction extends FunctionConstructor {
	$factory?: Function;
}

export class ServiceAnnotation extends AngularAnnotation {
	private module: angular.IModule;
	private params: IServiceAnnotationOptions;
	private factoryTatarget: FactoryFunction;
	constructor(params: IServiceAnnotationOptions, target: Function) {
		super(MetadataType.SERVICE, target);
		this.params = params;
		
		if(this.params.factory) {
			this.factoryTatarget = <FactoryFunction>target;	
		} else {
			this.params.factory = false;
		}
	}
	
	register(module: angular.IModule) : angular.IModule {
		this.module = module;
		if(this.params.factory) {
			return this.registerFactory(module);
		}
		return this.module.service(this.params.name, this.target);
	}
	
	registerFactory(module: angular.IModule) {
		if(!this.factoryTatarget.$factory) {
			throw new Error(`ngDecorate: Factory class ${this.params.name} must implement static method $factory`);
		}
		return this.module.factory(this.params.name, this.factoryTatarget.$factory);
	}
}

export function Service(options: IServiceAnnotationOptions) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
		case 1:
		  new ServiceAnnotation(options, Constructor).attach();
		  break;
		default:
		  throw new Error("Decorators are only valid on class declarations!");
		}
	}
}