/// <reference path="../typings/angularjs/angular.d.ts" />
import {getAnnotation, MetadataType} from './annotate';
import {ControllerAnnotation} from './Annotations/ControllerAnnotation';

export {Controller} from './Annotations/ControllerAnnotation';
export {Inject} from './Annotations/InjectAnnotation';
export {Service} from './Annotations/ServiceAnnotation';

export function bootstrap(module: angular.IModule, ControllerFunction: Function) : angular.IModule {
	let annotation = <ControllerAnnotation>getAnnotation(MetadataType.CONTROLLER,  ControllerFunction);
	return annotation.register(module); 
}