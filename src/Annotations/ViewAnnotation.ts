import Annotation from './Annotation';
import {MetadataType} from '../annotate';

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