import Annotation from './Annotation';
import {DirectiveAnnotation} from './DirectiveAnnotation';
import {MetadataType, hasAnnotation, getAnnotation} from '../annotate';

export interface IViewParams {
	template?: string;
	templateUrl?: string;
	directives?: Function[];  
}

export class ViewAnnotation extends Annotation {
	private params: IViewParams;
	
	constructor(params: IViewParams, classConstructor: Function) {
		super(classConstructor, MetadataType.VIEW);
		
		this.params = params;
	}
	
	getTemplate(): string {
		return this.params.template;
	}
	
	getTemplateUrl(): string {
		return this.params.templateUrl;
	}
	
	registerDirectives(module: angular.IModule): angular.IModule {
		for(let directive of this.params.directives) {
			this.registerDirective(module, directive);	
		}
		
		return module;
	}
	
	registerDirective(module: angular.IModule, directive: Function) {
		let annotation: DirectiveAnnotation;
		if(hasAnnotation(MetadataType.DIRECTIVE, directive)) {
			annotation = <DirectiveAnnotation> getAnnotation(MetadataType.DIRECTIVE, directive);
		}
		
		annotation.register(module);
	}
}


export function View(options: IViewParams) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
			case 1:
				new ViewAnnotation(options, Constructor).attach();
				break;
			default:
				throw new Error("Decorators are only valid on class declarations!");
		}
	}
}