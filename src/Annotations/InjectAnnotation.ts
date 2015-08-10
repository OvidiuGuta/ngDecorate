import Annotation from './Annotation';
import MetadataType from './MetadataType';

export class InjectAnnotation extends Annotation {
	injectables: string[];
	
	constructor(injectables: string[], classConstructor: Function) {
		super(classConstructor, MetadataType.INJECT);
		this.injectables = injectables;
	}
}

export interface IAnnotatedMethod extends FunctionConstructor {
	[key : string]: Function
}

export function Inject(...injectables: string[]) {
	return (...args: any[]) => {
		let Constructor: Function = args[0];
		switch(args.length) {
			case 1:
				Constructor.$inject = injectables;
				new InjectAnnotation(injectables, Constructor).attach();
				break;				
			default:
				throw new Error("Decorators are only valid on class declarations!");
		}
	}
}