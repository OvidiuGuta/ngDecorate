/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
import * as angular from 'angular';
import {AngularAnnotation, IAngularAnnotationOptions} from './AngularAnnotation';
import {ControllerAnnotation} from './ControllerAnnotation';
import {ViewAnnotation} from './ViewAnnotation';
import {MetadataType, getAnnotation} from '../annotate';

export interface IRouteConfigAnnotationOptions extends IAngularAnnotationOptions {
	config: angular.ui.IState;
}

export class RouteConfigAnnotation extends AngularAnnotation {
	private params: IRouteConfigAnnotationOptions;
	constructor(params: IRouteConfigAnnotationOptions, classConstructor: Function) {
		super(MetadataType.ROUTE_CONFIG, classConstructor);
		
		this.params = params;
	}
	
	register(module: angular.IModule): angular.IModule {
		let stateConfig: angular.ui.IState = this.params.config;
		
		stateConfig.controller = stateConfig.controllerAs = this.getControllerAnnotation().getName();
		
		let viewAnnotation = this.getViewAnnotation();
		stateConfig.template = viewAnnotation.getTemplate();
		if(!stateConfig.template) {
			stateConfig.templateUrl = viewAnnotation.getTemplateUrl();	
		}
		
		module.config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
			$stateProvider.state(this.params.name, stateConfig);
		}]);
		
		return module;
	}
	
	getControllerAnnotation(): ControllerAnnotation{
		return <ControllerAnnotation>getAnnotation(MetadataType.CONTROLLER, this.target);
	};
	
	getViewAnnotation(): ViewAnnotation{
		return <ViewAnnotation>getAnnotation(MetadataType.VIEW, this.target);
	};
}


export function RouteConfig(options: IRouteConfigAnnotationOptions) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
			case 1:
				new RouteConfigAnnotation(options, Constructor).attach();
				break;
			default:
				throw new Error("Decorators are only valid on class declarations!");
		}
	}
}