/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {ControllerAnnotation} from './ControllerAnnotation';
import {ViewAnnotation} from './ViewAnnotation';
import {IRouteConfigAnnotationOptions} from './AnnotationOptions/IRouteConfigAnnotationOptions';

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
		
		viewAnnotation.registerDirectives(module);
		
		module.config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
			$stateProvider.state(this.params.name, stateConfig);
		}]);
		
		return module;
	}
	
	getControllerAnnotation(): ControllerAnnotation{
		return <ControllerAnnotation>AngularAnnotation.getAnnotation(MetadataType.CONTROLLER, this.target);
	};
	
	getViewAnnotation(): ViewAnnotation{
		return <ViewAnnotation>AngularAnnotation.getAnnotation(MetadataType.VIEW, this.target);
	};
}

export function RouteConfig(options: IRouteConfigAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new RouteConfigAnnotation(options, Constructor).attach();
	});
}