/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
import * as angular from 'angular';
import {IAngularAnnotationOptions} from './IAngularAnnotationOptions';

export interface IRouteConfigAnnotationOptions extends IAngularAnnotationOptions {
	config: angular.ui.IState;
}