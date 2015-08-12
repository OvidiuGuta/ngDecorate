/// <reference path="../../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';

export interface IComponentAnnotationOptions {
	selector: string;
	appInjector?: Function[];
	staticInject?: string[];
	ddo?: angular.IDirective;
};