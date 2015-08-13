/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import Annotation from './Annotation';
import MetadataType from './MetadataType';
import {InjectAnnotation} from './InjectAnnotation';

export class AngularAnnotation extends Annotation {
	protected injectAnnotation: InjectAnnotation;
	protected registered: boolean;
	
	constructor(type: MetadataType, target: Function) {
		super(type, target);
		
		this.registered = false;
		this.injectAnnotation = this.getInjectAnnotation();
	}
	
	register(module: angular.IModule) : angular.IModule {
		throw new Error('This method is abstract');
	}
	
	protected reattach() {
		this.registered = true;
		this.attach();
	}
	
	isRegistered(): boolean {
		return this.registered;
	}
	
	getInjectAnnotation() : InjectAnnotation {
		return <InjectAnnotation>Annotation.getAnnotation(MetadataType.INJECT, this.target);
	}
}