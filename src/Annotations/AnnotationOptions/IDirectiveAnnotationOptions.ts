/// <reference path="../../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';

export interface IDirectiveAnnotationOptions {
	selector: string;
	staticInject?: string[];
	ddo?: angular.IDirective;
};