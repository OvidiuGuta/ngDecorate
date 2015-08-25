/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import MetadataType from './Annotations/MetadataType';
import {ControllerAnnotation} from './Annotations/ControllerAnnotation';
import {ServiceAnnotation} from './Annotations/ServiceAnnotation';
import {StateConfigAnnotation} from './Annotations/StateConfigAnnotation';
import Annotation from './Annotations/Annotation';

export {Annotation};
export {AngularAnnotation} from './Annotations/AngularAnnotation';
export {Controller} from './Annotations/ControllerAnnotation';
export {Inject} from './Annotations/InjectAnnotation';
export {Service} from './Annotations/ServiceAnnotation';
export {View} from './Annotations/ViewAnnotation';
export {StateConfig} from './Annotations/StateConfigAnnotation';
export {Directive} from './Annotations/DirectiveAnnotation';
export {Component} from './Annotations/ComponentAnnotation';

export function bootstrap(module: angular.IModule, ControllerFunction: Function) : angular.IModule {
	if(StateConfigAnnotation.hasAnnotation(MetadataType.STATE_CONFIG, ControllerFunction)) {
		(<StateConfigAnnotation>StateConfigAnnotation.getAnnotation(MetadataType.STATE_CONFIG, ControllerFunction)).register(module);	
	}
	
	if(!ControllerAnnotation.hasAnnotation(MetadataType.CONTROLLER, ControllerFunction)) {
		throw new Error(`ngDecorate: No Controller annotation on bootstrap target ${ControllerFunction}`);
	}
	
	return (<ControllerAnnotation>ControllerAnnotation.getAnnotation(MetadataType.CONTROLLER,  ControllerFunction)).register(module); 
}

export function bootstrapService(module: angular.IModule, ServiceFunction: Function) : angular.IModule {
	if(!ServiceAnnotation.hasAnnotation(MetadataType.SERVICE, ServiceFunction)) {
		throw new Error(`ngDecorate: No Service annotation on bootstrap target ${ServiceFunction}`);
	}
	
	return (<ServiceAnnotation>ServiceAnnotation.getAnnotation(MetadataType.SERVICE,  ServiceFunction)).register(module); 
}