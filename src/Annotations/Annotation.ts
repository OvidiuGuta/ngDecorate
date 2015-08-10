import MetadataType from './MetadataType';

export default class Annotation {
	target: Function;
	type: MetadataType;
	
	constructor(target: Function, type: MetadataType) {
		this.target = target;
		this.type = type;
	}
	
	attach() {
		Annotation.annotate(this);
	}
	
	static annotate(annotation: Annotation) {
		Reflect.defineMetadata(annotation.type, annotation, annotation.target);
	}
	
	static getAnnotation(tag: MetadataType, target: Function): Annotation {
		return Reflect.getMetadata(tag, target);
	}
	
	static hasAnnotation(tag: MetadataType, target: Function): boolean {
		return Reflect.hasMetadata(tag, target);
	}
}