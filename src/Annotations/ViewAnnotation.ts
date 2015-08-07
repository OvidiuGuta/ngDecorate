import Annotation from './Annotation';
import {MetadataType} from '../annotate';

interface IViewParams {
	template?: string;
	templateUrl?: string;
	directives?: Function[];  
}

export class ViewAnnotation extends Annotation {
	params: IViewParams;
	
	constructor(param: IViewParams, classConstructor: Function) {
		super(classConstructor, MetadataType.VIEW);
	}
}


export function View(...injectables: string[]) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
			case 1:
				new ViewAnnotation(injectables, Constructor).attach();
				break;
			default:
				throw new Error("Decorators are only valid on class declarations!");
		}
	}
}