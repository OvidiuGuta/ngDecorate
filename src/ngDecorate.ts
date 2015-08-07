/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import {getAnnotation, MetadataType} from './annotate';
import {ControllerAnnotation} from './Annotations/ControllerAnnotation';
import {RouteConfigAnnotation} from './Annotations/ControllerAnnotation';

export {Controller} from './Annotations/ControllerAnnotation';
export {Inject} from './Annotations/InjectAnnotation';
export {Service} from './Annotations/ServiceAnnotation';
export {View} from './Annotations/ViewAnnotation';
export {RouteConfig} from './Annotations/RouteConfigAnnotation';

export function bootstrap(module: angular.IModule, ControllerFunction: Function) : angular.IModule {
	(<RouteConfigAnnotation>getAnnotation(MetadataType.ROUTE_CONFIG, ControllerFunction)).register(module);
	
	let annotation = <ControllerAnnotation>getAnnotation(MetadataType.CONTROLLER,  ControllerFunction);
	return annotation.register(module); 
}