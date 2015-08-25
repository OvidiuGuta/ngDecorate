/// <reference path="../../dev/ngDecorate.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import ngDecorateTest from './module';
import {bootstrap} from 'ngDecorate/ngDecorate';
import {StateConfig, View, Controller} from 'ngDecorate/ngDecorate';

@StateConfig({
	name: 'simpleRoute',
	config: {
		url: '/simpleRoute'
	}
})
@Controller({
	name: 'SimpleStateConfigController'
})
@View({
	templete: 'SimpleStateConfigTemplate'
})
export class SimpleStateConfig {
	constructor() {
		
	}
}

@StateConfig({
	name: 'stateConfigNoController',
	config: {
		url: '/stateConfigNoController'
	}
})
export class StateConfigNoController {
	contructor() {
		
	}
}

@StateConfig({
	name: 'stateConfigNoView',
	config: {
		url: '/stateConfigNoView'
	}
})
@Controller({
	name: 'SimpleStateConfigNoViewController'
})
export class StateConfigNoView {
	contructor() {
		
	}
}

@StateConfig({
	name: 'bootstrapedStateConfig',
	config: {
		url: '/bootstrapedStateConfig'
	}
})
@Controller({
	name: 'BootstrapedStateConfigController'
})
@View({
	templete: 'BootstrapedStateConfigTemplate'
})
export class BootstrapedStateConfig {
	constructor() {
		
	}
}

bootstrap(ngDecorateTest, BootstrapedStateConfig);