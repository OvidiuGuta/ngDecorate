import Annotation from './Annotation';
import MetadataType from './MetadataType';

export class InjectAnnotation extends Annotation {
	injectables: string[];
	
	constructor(injectables: string[], classConstructor: Function) {
		super(MetadataType.INJECT, classConstructor);
		this.injectables = injectables;
	}
}

export function Inject(...injectables: string[]) {
	return Annotation.getClassDecorator((Constructor: Function) => {
		Constructor.$inject = injectables;
		new InjectAnnotation(injectables, Constructor).attach();
	});
}