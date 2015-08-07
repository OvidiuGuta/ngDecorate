/// <reference path="../../typings/angularjs/angular.d.ts" />
import * as angular from 'angular';
import Annotation from './Annotation';
import {InjectAnnotation} from './InjectAnnotation';
import {MetadataType, getAnnotation} from '../annotate';

export interface IAngularAnnotationOptions  {
	name: string;
	type?: MetadataType;
}

export class AngularAnnotation extends Annotation {
	protected injectAnnotation: InjectAnnotation;
	
	constructor(type: MetadataType, target: Function) {
		super(target, type);
		
		this.injectAnnotation = this.getInjectAnnotation();
	}
	
	register(module: angular.IModule) : angular.IModule {
		throw new Error('This method is abstract');
	}
	
	getInjectAnnotation() : InjectAnnotation {
		return <InjectAnnotation>getAnnotation(MetadataType.INJECT, this.target);
	}
}