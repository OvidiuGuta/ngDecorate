///<reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import 'reflect-metadata';
import Annotation from './Annotations/Annotation';

export enum MetadataType {
	CONTROLLER,
	INJECT,
	SERVICE,
	DIRECTIVE,
	VIEW,
	ROUTE_CONFIG
}

export function annotate(data: Annotation): void {		
	Reflect.defineMetadata(data.type, data, data.target);
}

export function getAnnotation(tag: MetadataType, target: Function): Annotation {
	return Reflect.getMetadata(tag, target);
}