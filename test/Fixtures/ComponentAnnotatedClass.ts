/// <reference path="../../dev/ngDecorate.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {Component, View, Inject} from 'ngDecorate/ngDecorate'

@Component({
	selector: 'simpleComponent',
	staticInject: ['staticInjectable']
})
@View({
	template: 'template'
})
export class SimpleComponent {
	static name: string;
	static staticInjectable: string;
	constructor() {
		
	}
	
	static $link() {
		
	}
}

@Component({
	selector: 'simpleComponentNoView'
})
export class SimpleComponentNoView {
	constructor() {
		
	}
}
