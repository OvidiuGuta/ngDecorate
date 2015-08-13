import MetadataType from './MetadataType';

export default class Annotation {
	target: Function;
	type: MetadataType;
	
	constructor(type: MetadataType, target: Function) {
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
	
	static getClassDecorator(classDecoratorBody: Function) {
		return (...args: any[]) => {
			let Constructor: Function = args[0];
			switch(args.length) {
				case 1:
				  classDecoratorBody.call(this, Constructor);
				  break;
				default:
				  throw new Error('ngDecorate: Decorators are only valid on class declarations!');
			}
		}
	}
}