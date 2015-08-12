import Annotation from './Annotation';
import MetadataType from './MetadataType';
import {DirectiveAnnotation} from './DirectiveAnnotation';

export interface IViewParams {
	template?: string;
	templateUrl?: string;
	directives?: Function[];  
}

export class ViewAnnotation extends Annotation {
	private params: IViewParams;
	
	constructor(params: IViewParams, classConstructor: Function) {
		super(MetadataType.VIEW, classConstructor);
		
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
		if(Annotation.hasAnnotation(MetadataType.DIRECTIVE, directive)) {
			annotation = <DirectiveAnnotation>Annotation.getAnnotation(MetadataType.DIRECTIVE, directive);
		}
		
		annotation.register(module);
	}
}

export function View(options: IViewParams) {
	return Annotation.getClassDecorator((Constructor: Function) => {
		new ViewAnnotation(options, Constructor).attach();
	});
}