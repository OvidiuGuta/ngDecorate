/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {IServiceAnnotationOptions} from './AnnotationOptions/IServiceAnnotationOptions';

export interface FactoryFunction extends FunctionConstructor {
	$factory?: Function;
}

export class ServiceAnnotation extends AngularAnnotation {
	private module: angular.IModule;
	private params: IServiceAnnotationOptions;
	private factoryTatarget: FactoryFunction;
	private registered: boolean;
	constructor(params: IServiceAnnotationOptions, target: Function) {
		super(MetadataType.SERVICE, target);
		this.params = params;
		this.registered = false;
		
		if(this.params.factory) {
			this.factoryTatarget = <FactoryFunction>target;	
		} else {
			this.params.factory = false;
		}
	}
	
	register(module: angular.IModule) : angular.IModule {
		if(this.registered) {
			return module;
		}
		this.registered = true;
		if(this.params.factory) {
			return this.registerFactory(module);
		}
		return module.service(this.params.name, this.target);
	}
	
	registerFactory(module: angular.IModule) {
		if(!this.factoryTatarget.$factory) {
			throw new Error(`ngDecorate: Factory class ${this.params.name} must implement static method $factory`);
		}
		return module.factory(this.params.name, this.factoryTatarget.$factory);
	}
}

export function Service(options: IServiceAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new ServiceAnnotation(options, Constructor).attach();
	});
}