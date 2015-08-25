/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
import * as angular from 'angular';
import MetadataType from './MetadataType';
import {AngularAnnotation} from './AngularAnnotation';
import {ControllerAnnotation} from './ControllerAnnotation';
import {ViewAnnotation} from './ViewAnnotation';
import {IStateConfigAnnotationOptions} from './AnnotationOptions/IStateConfigAnnotationOptions';

export class StateConfigAnnotation extends AngularAnnotation {
	private params: IStateConfigAnnotationOptions;
	constructor(params: IStateConfigAnnotationOptions, classConstructor: Function) {
		super(MetadataType.STATE_CONFIG, classConstructor);
		
		this.params = params;
	}
	
	register(module: angular.IModule): angular.IModule {
		if(this.isRegistered()) {
			return module;
		}
		
		if(!AngularAnnotation.hasAnnotation(MetadataType.CONTROLLER, this.target)) {
			throw new Error(`ngDecorate: No Controller annotation on class ${this.target}!`);
		}
		
		if(!AngularAnnotation.hasAnnotation(MetadataType.VIEW, this.target)) {
			throw new Error(`ngDecorate: No View annotation on class ${this.target}!`);
		}
		
		let stateConfig: angular.ui.IState = this.params.config;
		stateConfig.controller = stateConfig.controllerAs = ControllerAnnotation.getControllerAnnotation(this.target).getName();
		
		let viewAnnotation = ViewAnnotation.getViewAnnotation(this.target);
		stateConfig.template = viewAnnotation.getTemplate();
		if(!stateConfig.template) {
			stateConfig.templateUrl = viewAnnotation.getTemplateUrl();	
		}
		
		viewAnnotation.registerDirectives(module);
		
		this.reattach();
		module.config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
			$stateProvider.state(this.params.name, stateConfig);
		}]);
		
		return module;
	}
}

export function StateConfig(options: IStateConfigAnnotationOptions) {
	return AngularAnnotation.getClassDecorator((Constructor: Function) => {
		new StateConfigAnnotation(options, Constructor).attach();
	});
}